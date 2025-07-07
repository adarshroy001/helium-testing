// app/api/auth/verify-otp/route.ts
import { NextResponse } from 'next/server';
import OTPModel from '@/models/Otp.model';
import UserModel from '@/models/User.model';
import { connectDB } from '@/lib/db';
import { verifyOtpSchema } from '@/schemas/otp.schema';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import mongoose from 'mongoose';

// Rate limiting helper (implement this in your utils)
const rateLimit = new Map();

function isRateLimited(identifier: string): boolean {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxAttempts = 5;

  if (!rateLimit.has(identifier)) {
    rateLimit.set(identifier, { count: 1, resetTime: now + windowMs });
    return false;
  }

  const limit = rateLimit.get(identifier);
  if (now > limit.resetTime) {
    rateLimit.set(identifier, { count: 1, resetTime: now + windowMs });
    return false;
  }

  if (limit.count >= maxAttempts) {
    return true;
  }

  limit.count++;
  return false;
}

export async function POST(req: Request) {
  try {
    // 1. Rate limiting
    const identifier = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'anonymous';
    if (isRateLimited(identifier)) {
      return NextResponse.json({ 
        success: false, 
        error: 'Too many attempts. Please try again later.' 
      }, { status: 429 });
    }

    // 2. Validate environment
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is required');
    }

    // 3. Parse and validate request
    const body = await req.json();
    const parsed = verifyOtpSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ 
        success: false, 
        error: 'Invalid request data',
        details: parsed.error.format() 
      }, { status: 400 });
    }

    const { email, otp } = parsed.data;

    // 4. Connect to database
    await connectDB();

    // 5. Use transaction for data consistency
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // 6. Find and update OTP in one operation
      const record = await OTPModel.findOneAndUpdate(
        { 
          email, 
          otp, 
          verified: false, 
          expiresAt: { $gte: new Date() } 
        },
        { 
          verified: true,
          verifiedAt: new Date()
        },
        { 
          session, 
          new: true 
        }
      );

      if (!record) {
        await session.abortTransaction();
        return NextResponse.json({ 
          success: false, 
          error: 'Invalid or expired OTP' 
        }, { status: 400 });
      }

      // 7. Create or find user with upsert
      const user = await UserModel.findOneAndUpdate(
        { email },
        {
          email,
          $setOnInsert: {
            firstName: '',
            lastName: '',
            country: '',
            gstNo: '',
            addressLineOne: '',
            addressLineTwo: '',
            city: '',
            state: '',
            pin: '',
            phone: '',
            createdAt: new Date(),
          }
        },
        { 
          upsert: true, 
          new: true, 
          session 
        }
      );

      // 8. Commit transaction
      await session.commitTransaction();

      // 9. Generate JWT token
      const token = jwt.sign(
        { 
          userId: user._id, 
          email: user.email,
          iat: Math.floor(Date.now() / 1000)
        },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      // 10. Set secure HTTP-only cookie
      const cookieStore = await cookies();
      cookieStore.set('helium_auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      });

      // 11. Return success response (don't expose sensitive user data)
      return NextResponse.json({ 
        success: true, 
        message: 'OTP verified successfully',
        user: {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName
        }
      });

    } catch (transactionError) {
      await session.abortTransaction();
      throw transactionError;
    } finally {
      session.endSession();
    }

  } catch (error) {
    // 12. Error logging and handling
    console.error('OTP verification error:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
      // Don't log sensitive data like email/otp
    });

    return NextResponse.json({ 
      success: false, 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}

// Optional: Add database indexes for better performance
// Run this in your MongoDB:
// db.otps.createIndex({ email: 1, otp: 1 })
// db.otps.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 })
// db.users.createIndex({ email: 1 }, { unique: true })