import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { connectDB } from '@/lib/db';
import UserModel from '@/models/User.model';

export interface AuthenticatedUser {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
}

export async function getAuthenticatedUser(): Promise<AuthenticatedUser | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('helium_auth_token')?.value;

    if (!token) {
      return null;
    }

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    
    if (!decoded.userId || !decoded.email) {
      return null;
    }

    // Connect to database and get fresh user data
    await connectDB();
    const user = await UserModel.findById(decoded.userId);

    if (!user) {
      return null;
    }

    return {
      userId: user._id.toString(),
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName
    };

  } catch (error) {
    console.error('Authentication error:', error);
    return null;
  }
}

export function requireAuth() {
  return async (req: Request) => {
    const user = await getAuthenticatedUser();
    if (!user) {
      throw new Error('Authentication required');
    }
    return user;
  };
}
