import { NextResponse } from 'next/server';
import { sendOtpSchema } from '@/schemas/otp.schema';
import { connectDB } from '@/lib/db';
import OTPModel from '@/models/Otp.model';
import { generateOTP, sendOtpViaEmail } from '@/lib/otp-utils';

export async function POST(req: Request) {
  try {
    // 1. Validate request body
    const body = await req.json();
    const parsed = sendOtpSchema.safeParse(body);
    
    if (!parsed.success) {
      return NextResponse.json({ 
        success: false,
        error: 'Invalid email format',
        details: parsed.error.format() 
      }, { status: 400 });
    }

    const { email } = parsed.data;
    console.log('📧 Sending OTP to email:', email);
    
    // 2. Check environment variables
    if (!process.env.RESEND_API_KEY) {
      console.error('❌ RESEND_API_KEY not found in environment variables');
      return NextResponse.json({ 
        success: false,
        error: 'Email service configuration error' 
      }, { status: 500 });
    }

    // 3. Connect to database
    await connectDB();

    // 4. Generate OTP and expiry
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    console.log('🔐 Generated OTP:', otp, 'for email:', email);

    // 5. Save OTP to database
    const otpRecord = await OTPModel.create({ 
      email, 
      otp, 
      expiresAt,
      verified: false 
    });
    console.log('💾 OTP saved to database:', otpRecord._id);

    // 6. Send email with corrected error handling
    try {
      const emailResponse = await sendOtpViaEmail(email, otp);
      
      if (emailResponse.success) {
        console.log('✅ Email sent successfully. Message ID:', emailResponse.messageId);
        
        return NextResponse.json({ 
          success: true, 
          message: 'OTP sent to email successfully',
          messageId: emailResponse.messageId // Use messageId instead of id
        });
      } else {
        throw new Error('Email sending failed');
      }
      
    } catch (emailError) {
      console.error('❌ Email sending failed:', emailError);
      
      // Delete the OTP record if email fails
      await OTPModel.deleteOne({ _id: otpRecord._id });
      
      return NextResponse.json({ 
        success: false,
        error: 'Failed to send email. Please try again.',
        details: emailError instanceof Error ? emailError.message : 'Unknown email error'
      }, { status: 500 });
    }

  } catch (error) {
    console.error('❌ Send OTP API Error:', error);
    return NextResponse.json({ 
      success: false,
      error: 'Internal server error' 
    }, { status: 500 });
  }
}
