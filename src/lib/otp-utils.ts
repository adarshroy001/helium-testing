import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Generate 6-digit OTP
export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Send OTP via Resend
export async function sendOtpViaEmail(email: string, otp: string) {
  try {
    const response = await resend.emails.send({
      from: 'Helium <onboarding@resend.dev>',
      to: [email],
      subject: 'Your Helium OTP Code',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #0e0e0e; color: white;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #f3942c; margin: 0; font-size: 28px;">HELIUM</h1>
            <p style="color: #888; margin: 5px 0;">Premium Air Conditioning Solutions</p>
          </div>
          
          <div style="background-color: #1a1a1a; padding: 30px; border-radius: 10px; border: 1px solid #333;">
            <h2 style="color: #f3942c; margin-top: 0; text-align: center;">🔐 Your OTP Code</h2>
            <p style="color: #ccc; text-align: center; margin-bottom: 25px;">
              Use the following OTP to complete your checkout:
            </p>
            
            <div style="background-color: #f3942c; color: black; font-size: 32px; font-weight: bold; text-align: center;  border-radius: 8px; letter-spacing: 5px; margin: 25px 0;">
              ${otp}
            </div>
            
            <div style="background-color: #2a2a2a; padding: 15px; border-radius: 6px; border-left: 4px solid #f3942c;">
              <p style="margin: 0; color: #ccc; font-size: 14px;">
                <strong>⏰ Valid for 5 minutes only</strong><br>
                🔒 Do not share this code with anyone<br>
                📧 This email was sent for your Helium checkout
              </p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #333;">
            <p style="color: #666; font-size: 12px; margin: 0;">
              Helium - Cooling Solutions for Modern Homes<br>
              This is an automated message, please do not reply.
            </p>
          </div>
        </div>
      `
    });

    // Log the actual response to see its structure
    console.log('✅ Resend Email Response:', JSON.stringify(response, null, 2));
    
    // Return the response data correctly
    return {
      success: response.data ? true : false,
      messageId: response.data?.id || null, // Use response.data.id instead of response.id
      error: response.error || null
    };
    
  } catch (err) {
    console.error('❌ Error sending OTP email via Resend:', err);
    throw new Error('Failed to send OTP email');
  }
}
