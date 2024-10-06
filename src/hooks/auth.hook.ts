import { useMutation } from "@tanstack/react-query";
import {
  changePassword,
  loginUser,
  registerUser,
} from "../services/AuthService";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

// register hook
export const useUserRegistration = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_REGISTRATION"],
    mutationFn: async (userData) => await registerUser(userData),
    onSuccess: () => toast.success("Register Successfully"),
    onError: (error) => {
      toast.error(
        error.message.includes("Duplicate error")
          ? "Email already exists"
          : error.message
      );
    },
  });
};

// login hook
export const useUserLogin = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_LOGIN"],
    mutationFn: async (userData) => await loginUser(userData),
    onSuccess: () => toast.success("Login Successfully"),
    onError: (error) => {
      toast.error(error.message.replace("AxiosError:", ""));
    },
  });
};

// change password hook
export const useChangePasswordMutation = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["CHANGE_PASSWORD"],
    mutationFn: async (passwordData) => await changePassword(passwordData),
    onSuccess: () => toast.success("Password changed successfully"),
    onError: (error) => toast.error(error.message),
  });
};
