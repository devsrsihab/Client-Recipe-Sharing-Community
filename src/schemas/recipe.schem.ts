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
  prepTime: z.string().min(1, "Prep time is required"),
  cookTime: z.string().min(1, "Cook time is required"),
});

// Update schema: make all fields optional using .partial()
export const updateRecipeSchema = z.object({
  title: z.string().min(1, "Title is required").optional(),
  description: z.string().min(1, "Description is required").optional(),
  ingredients: z.array(ingredientSchema).optional(),
  instructions: z.string().min(1, "Instructions are required").optional(),
  category: z.string().min(1, "Category is required").optional(),
  prepTime: z.string().min(1, "Prep time is required").optional(),
  cookTime: z.string().min(1, "Cook time is required").optional(),
  status: z.enum(["pending", "published", "unpublished", "private"]).optional(),
  isPaid: z.string().optional(),
});
