import { z } from "zod";

// Zod schema for individual ingredients
export const ingredientSchema = z.object({
  name: z.string(),
  quantity: z.string(),
});

// Zod schema for the entire recipe
export const createRecipeSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  ingredients: z.array(ingredientSchema),
  instructions: z.string().min(1, "Instructions are required"),
  category: z
    .string({ required_error: "Category is required" })
    .min(1, "Category is required"),
  prepTime: z
    .string({ required_error: "Prep time is required" })
    .min(1, "Prep time must be a positive integer"),
  cookTime: z
    .string({ required_error: "Cook time is required" })
    .min(1, "Cook time must be a positive integer"),
});
