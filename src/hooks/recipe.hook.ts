import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { FieldValues } from "react-hook-form";
import {
  createRecipe,
  deleteRecipe,
  downvoteRecipe,
  getRecipeDetails,
  getRecipeFeeds,
  getRecipes,
  updateRecipe,
  upvoteRecipe,
} from "../services/Recipes";

// get recipe feeds
export const useGetRecipeFeeds = (page: number = 1, limit: number = 6) => {
  return useQuery({
    queryKey: ["GET_RECIPE_FEEDS"],
    queryFn: async () => await getRecipeFeeds(page, limit),
    refetchOnWindowFocus: false, // Prevent refetching on window focus
  });
};

// create recipes
export const useCreateRecipeMutation = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["CREATE_RECIPE"],
    mutationFn: async (postData) => await createRecipe(postData),
    onSuccess: () => toast.success("Recipe Created Successfully"),
    onError: (error) => toast.error(error.message.replace("Error: ", "")),
  });
};

// get all recipes based user createdBy
export const useGetRecipes = () => {
  return useQuery({
    queryKey: ["GET_RECIPES"],
    queryFn: async () => await getRecipes(),
    refetchOnWindowFocus: false, // Prevent refetching on window focus
  });
};

// get recipe details
export const useGetRecipeDetails = (recipeId: string) => {
  return useQuery({
    queryKey: ["GET_RECIPE_DETAILS", recipeId],
    queryFn: async () => await getRecipeDetails(recipeId),
  });
};

// update recipe
export const useUpdateRecipeMutation = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["UPDATE_RECIPE"],
    mutationFn: async ({ id, data }) => await updateRecipe(id, data),
    onSuccess: () => toast.success("Recipe Updated Successfully"),
    onError: (error) => toast.error(error.message.replace("Error: ", "")),
  });
};

// delete recipe
export const useDeleteRecipeMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, string>({
    mutationKey: ["DELETE_RECIPE"],
    mutationFn: async (recipeId) => await deleteRecipe(recipeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_RECIPES"] });
      toast.success("Recipe Deleted Successfully");
    },
    onError: (error) => toast.error(error.message.replace("Error: ", "")),
  });
};

// upvote recipe
export const useUpvoteRecipeMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, string>({
    mutationKey: ["UPVOTE_RECIPE"],
    mutationFn: async (id) => await upvoteRecipe(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: ["GET_RECIPE_DETAILS", id],
      });
      toast.success("Upvoted Successfully");
    },
    onError: (error) => toast.error(error.message.replace("Error: ", "")),
  });
};

// downvote recipe
export const useDownvoteRecipeMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<any, Error, string>({
    mutationKey: ["DOWNVOTE_RECIPE"],
    mutationFn: async (id) => await downvoteRecipe(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: ["GET_RECIPE_DETAILS", id],
      });
      toast.success("Downvoted Successfully");
    },
    onError: (error) => toast.error(error.message.replace("Error: ", "")),
  });
};
