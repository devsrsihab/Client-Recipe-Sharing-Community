import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  changeRole,
  changeStatus,
  createUser,
  getAllUsers,
  deleteUserById,
  getUserById,
  updateUserById,
} from "../services/UserService";
import { toast } from "sonner";
import { FieldValues } from "react-hook-form";

// global query client
const queryClient = useQueryClient();

// TODO. get all users
export const useGetAllUsers = () => {
  return useQuery({
    queryKey: ["ALL_USERS"],
    queryFn: getAllUsers,
  });
};

// TODO. get user by id
export const useGetUserById = (id: string) => {
  return useQuery({
    queryKey: ["SINGLE_USER", id],
    queryFn: () => getUserById(id),
  });
};

// TODO. delete user by id
export const useDeleteUserByIdMutation = () => {
  return useMutation<any, Error, string>({
    mutationKey: ["DELETE_USER_BY_ID"],
    mutationFn: async (id) => await deleteUserById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ALL_USERS"] });
      toast.success("User Deleted Successfully");
    },
    onError: (error) => toast.error(error.message),
  });
};

// TODO. change role
export const useChangeRoleMutation = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["CHANGE_ROLE"],
    mutationFn: async ({ id, data }) => await changeRole(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ALL_USERS"] });
      toast.success("User Role Updated Successfully");
    },
    onError: (error) => toast.error(error.message),
  });
};

// TODO. change status
export const useChangeStatusMutation = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["CHANGE_STATUS"],
    mutationFn: async ({ id, data }) => await changeStatus(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ALL_USERS"] });
      toast.success("User Status Updated Successfully");
    },
    onError: (error) => toast.error(error.message),
  });
};

// TODO. create user
export const useCreateUserMutation = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["CREATE_USER"],
    mutationFn: async (postData) => await createUser(postData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ALL_USERS"] });
      toast.success("User Created Successfully");
    },
    onError: (error) => toast.error(error.message),
  });
};

// TODO. update user by id
export const useUpdateUserByIdMutation = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["UPDATE_USER_BY_ID"],
    mutationFn: async ({ id, data }) => await updateUserById(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ALL_USERS"] });
      toast.success("User Updated Successfully");
    },
    onError: (error) => toast.error(error.message),
  });
};
