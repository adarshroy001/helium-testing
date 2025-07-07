//models/user.model.ts

import {model, models, Schema} from "mongoose";
import { User } from "@/types/User"; 

const UserSchema = new Schema<User>(
  {
    email: { type: String, unique: true, required: true, trim: true },
    country: { type: String, required: true, trim: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    gstNo: { type: String, trim: true },
    addressLineOne: { type: String, required: true, trim: true },
    addressLineTwo: { type: String, trim: true },
    city: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    pin: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

const UserModel = models.User || model<User>("User", UserSchema);
export default UserModel;
