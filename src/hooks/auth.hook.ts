import { useMutation } from "@tanstack/react-query";
import {
  changePassword,
  forgetPassword,
  loginUser,
  registerUser,
  resetPassword,
} from "../services/AuthService";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// register hook
export const useUserRegistration = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_REGISTRATION"],
    mutationFn: async (userData) => await registerUser(userData),
    onSuccess: () => toast.success("Register Successfully"),
    onError: (error) => {
      toast.error(error.message.replace("AxiosError:", ""));
    },
  });
};

// login hook
export const useUserLogin = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_LOGIN"],
    mutationFn: async (userData) => await loginUser(userData),
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

// forget password hook
export const useForgetPasswordMutation = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["FORGET_PASSWORD"],
    mutationFn: async (email) => await forgetPassword(email),
    onSuccess: () =>
      toast.success(
        "Password reset link sent to your email. Check your email inbox."
      ),
    onError: (error) => toast.error(error.message),
  });
};

// reset password hook
export const useResetPasswordMutation = () => {
  const router = useRouter();

  return useMutation<any, Error, FieldValues>({
    mutationKey: ["RESET_PASSWORD"],
    mutationFn: async ({ resetData, token }) =>
      await resetPassword(resetData, token),
    onSuccess: () => {
      toast.success("Password reset successfully");
      router.push("/auth/login");
    },
    onError: (error) => toast.error(error.message),
  });
};
