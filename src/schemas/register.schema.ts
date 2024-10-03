import { z } from "zod";

const registerValidationSchema = z.object({
  firstName: z.string().trim().min(1, "First Name is required"),
  lastName: z.string().trim().min(1, "Last Name is required"),
  email: z.string().trim().email("Enter a valid email"),
  password: z.string().trim().min(6, "Password must be more than 6 characters"),
});

export default registerValidationSchema;
