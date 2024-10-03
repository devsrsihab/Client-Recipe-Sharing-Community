import { createPost } from "./../services/Post/index";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { FieldValues } from "react-hook-form";
import { getRecipes } from "../services/Recipes";

// create post
export const useCreatePostMutation = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["CREATE_POST"],
    mutationFn: async (postData) => await createPost(postData),
    onSuccess: () => toast.success("Post Created Successfully"),
    onError: (error) => {
      toast.error(error.message.replace("AxiosError:", ""));
    },
  });
};

// get all recipes
export const useGetRecipes = () => {
  return useQuery({
    queryKey: ["GET_RECIPES"],
    queryFn: async () => await getRecipes(),
  });
};
