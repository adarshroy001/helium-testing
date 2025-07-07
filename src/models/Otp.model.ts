import { OTP } from '@/types/Otp';
import {model, models, Schema} from "mongoose";


const OTPSchema = new Schema<OTP>(
  {
    email: { type: String, required: true, trim: true },
    otp: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    verified: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const OTPModel = models.OTP || model<OTP>("OTP", OTPSchema);
export default OTPModel;