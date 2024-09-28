import { createPost } from "./../services/Post/index";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { IFormData } from "../types";
import { FieldValues } from "react-hook-form";

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
