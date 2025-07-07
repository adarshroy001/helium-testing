import { z } from 'zod';

export const sendOtpSchema = z.object({
  email: z.string().email('Invalid email format').min(1, 'Email is required'),
});

export const verifyOtpSchema = z.object({
  email: z.string().email('Invalid email format'),
  otp: z.string().length(6, 'OTP must be exactly 6 digits').regex(/^\d{6}$/, 'OTP must contain only numbers'),
});

export type SendOtpRequest = z.infer<typeof sendOtpSchema>;
export type VerifyOtpRequest = z.infer<typeof verifyOtpSchema>;
