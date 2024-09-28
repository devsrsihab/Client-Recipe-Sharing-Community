import { z } from "zod";

const registerValidationSchema = z.object({
  name: z.string().trim(),
  mobileNumber: z
    .string()
    .trim()
    .regex(/^01\d{9}$/, {
      message: "The number must be 11 digits long and start with '01'.",
    }),
  email: z.string().trim().email("Enter A valid Email"),
  password: z.string().trim().min(6, "Password Must be more than 6 characters"),
});

export default registerValidationSchema;
