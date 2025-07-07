import { z } from "zod";

export const userSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .trim(),

  country: z
    .string()
    .min(1, { message: "Country is required" })
    .trim(),

  firstName: z
    .string()
    .min(1, { message: "First name is required" })
    .trim(),

  lastName: z
    .string()
    .min(1, { message: "Last name is required" })
    .trim(),

  gstNo: z
    .string()
    .trim()
    .optional(),

  addressLineOne: z
    .string()
    .trim()
    .min(1, { message: "Address Line 1 is required" }),

  addressLineTwo: z
    .string()
    .trim()
    .optional(),

  city: z
    .string()
    .trim()
    .min(1, { message: "City is required" }),

  state: z
    .string()
    .min(1, { message: "State is required" })
    .trim(),

  pin: z
    .string()
    .min(4, { message: "PIN code is required" })
    .max(10, { message: "PIN code seems too long" })
    .trim(),

  phone: z
    .string()
    .regex(/^\d{10}$/, { message: "Phone must be 10 digits" })
    .trim()
});
