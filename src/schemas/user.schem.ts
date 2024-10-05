import { z } from "zod";

export const userCreateSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  role: z.enum(["admin", "user"], {
    errorMap: () => ({ message: "Role must be either admin or user" }),
  }),
});

// Update schema: make all fields optional using .partial()
export const updateUserSchema = z.object({
  firstName: z.string().min(1, "First name is required").optional(),
  lastName: z.string().min(1, "Last name is required").optional(),
  email: z.string().email("Invalid email address").optional(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .optional(),
  role: z.enum(["admin", "user"]).optional(),
  status: z.enum(["active", "pending", "blocked"]).optional(),
  isPremium: z.string().optional(),
  profilePicture: z.string().optional(),
});
