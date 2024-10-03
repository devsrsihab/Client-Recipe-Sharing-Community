import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { FieldValues } from "react-hook-form";
import { createRecipe, getRecipes } from "../services/Recipes";

// create recipes
export const useCreateRecipeMutation = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["CREATE_RECIPE"],
    mutationFn: async (postData) => await createRecipe(postData),
    onSuccess: () => toast.success("Recipe Created Successfully"),
    onError: (error) => toast.error(error.message),
  });
};

// get all recipes
export const useGetRecipes = () => {
  return useQuery({
    queryKey: ["GET_RECIPES"],
    queryFn: async () => await getRecipes(),
  });
};
