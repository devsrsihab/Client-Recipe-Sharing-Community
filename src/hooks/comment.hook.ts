import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteComment,
  getAllComments,
  updateCommentStatus,
} from "../services/Comments";
import { toast } from "sonner";
import { FieldValues } from "react-hook-form";
import {
  getRecipeComments,
  getRecipeRating,
  makeRecipeComment,
  makeRecipeRating,
} from "../services/Recipes";
import { keepPreviousData } from "@tanstack/react-query";

// get all comments
export const useGetAllComments = () => {
  return useQuery({
    queryKey: ["ALL_COMMENTS"],
    queryFn: async () => await getAllComments(),
    refetchOnWindowFocus: false, // Prevent refetching on window focus
  });
};

// update comment status
export const useUpdateCommentStatus = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, FieldValues>({
    mutationKey: ["UPDATE_COMMENT_STATUS"],
    mutationFn: async ({ id, status }) => await updateCommentStatus(id, status),
    onSuccess: () => {
      toast.success("Comment status updated successfully");
      queryClient.invalidateQueries({ queryKey: ["ALL_COMMENTS"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

//  delete comment
export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, string>({
    mutationKey: ["DELETE_COMMENT"],
    mutationFn: async (id: string) => await deleteComment(id),
    onSuccess: () => {
      toast.success("Comment deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["ALL_COMMENTS"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

// make recipe comment
export const useMakeRecipeCommentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, FieldValues>({
    mutationKey: ["MAKE_RECIPE_COMMENT"],
    mutationFn: async ({ recipeId, comment }) =>
      await makeRecipeComment(recipeId, comment),
    onSuccess: (_, { recipeId }) => {
      queryClient.invalidateQueries({
        queryKey: ["GET_RECIPE_DETAILS", recipeId],
      });
      queryClient.invalidateQueries({
        queryKey: ["GET_RECIPE_COMMENTS", recipeId],
      });
      toast.success("Comment Successfully Added");
    },
    onError: (error) => toast.error(error.message.replace("Error: ", "")),
  });
};

// get recipe comments
export const useGetRecipeComments = (
  recipeId: string,
  page: number = 1,
  limit: number = 5
) => {
  return useQuery({
    queryKey: ["GET_RECIPE_COMMENTS", recipeId, page, limit],
    queryFn: async () => {
      const response = await getRecipeComments(recipeId, page, limit);
      return {
        comments: response.data,
        meta: response.meta,
      };
    },
    select: (data) => ({
      comments: data.comments,
      meta: data.meta,
    }),
    placeholderData: keepPreviousData,
    staleTime: 5000,
  });
};

// make recipe rating
export const useMakeRecipeRating = () => {
  const queryClient = useQueryClient();

  return useMutation<any, Error, FieldValues>({
    mutationKey: ["MAKE_RECIPE_RATING"],
    mutationFn: async ({ recipeId, rating }) =>
      await makeRecipeRating(recipeId, rating),
    onSuccess: (_, { recipeId }) => {
      queryClient.invalidateQueries({
        queryKey: ["GET_RECIPE_DETAILS", recipeId],
      });
      queryClient.invalidateQueries({
        queryKey: ["GET_RECIPE_RATING", recipeId],
      });
      toast.success("Rating Successfully Added");
    },
  });
};

// get recipe rating
export const useGetRecipeRating = (recipeId: string) => {
  return useQuery({
    queryKey: ["GET_RECIPE_RATING", recipeId],
    queryFn: async () => await getRecipeRating(recipeId),
  });
};
