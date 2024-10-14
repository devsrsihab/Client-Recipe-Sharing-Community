import { z } from "zod";

const loginValidationSchema = z.object({
  email: z.string().trim().email("Enter A valid Email"),
  password: z.string().trim().min(6, "Password Must be more than 6 characters"),
});

export default loginValidationSchema;
