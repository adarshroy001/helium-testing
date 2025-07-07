import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function getUserFromToken() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('helium_auth_token')?.value;

    if (!token) return null;

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is required');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (err) {
    // Log error for debugging (optional)
    console.error('Token verification failed:', err instanceof Error ? err.message : 'Unknown error');
    return null;
  }
}

// Alternative: If you need a synchronous version for middleware
export function getUserFromTokenSync(token: string) {
  try {
    if (!token) return null;

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is required');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (err) {
    return null;
  }
}
