import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteComment,
  getAllComments,
  updateCommentStatus,
} from "../services/Comments";
import { toast } from "sonner";
import { FieldValues } from "react-hook-form";

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

// TODO. delete comment
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
