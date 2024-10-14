// password change schema
import { z } from "zod";

export const passwordChangeSchema = z
  .object({
    oldPassword: z.string().min(1, { message: "Current password is required" }),
    newPassword: z.string().min(1, { message: "New password is required" }),
    confirmNewPassword: z
      .string()
      .min(1, { message: "Confirm password is required" }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });

// forget password schema
export const forgetPasswordSchema = z.object({
  email: z.string().email("Enter a valid email"),
});

// reset password schema
export const resetPasswordSchema = z
  .object({
    password: z.string().min(1, { message: "Password is required" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Confirm password do not match",
    path: ["confirmPassword"],
  });
