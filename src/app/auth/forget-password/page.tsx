"use client";

import { Button } from "@nextui-org/button";
import Link from "next/link";
import Container from "@/src/components/UI/Container";
import FXForm from "@/src/components/Form/FXForm";
import FXInput from "@/src/components/Form/FXInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgetPasswordSchema } from "@/src/schemas/passwordChange.schema";
import { useForgetPasswordMutation } from "@/src/hooks/auth.hook";

const ForgetPasswordPage = () => {
  // forget password mutation
  const {
    mutate: forgetPassword,
    isPending: forgetPasswordLoading,
    isSuccess: forgetPasswordSuccess,
  } = useForgetPasswordMutation();

  // handle submit
  const handleSubmit: SubmitHandler<FieldValues> = (data: any) => {
    forgetPassword({ email: data.email });
  };

  return (
    <Container>
      <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        {forgetPasswordSuccess ? (
          <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-6 sm:p-10 rounded-xl shadow-md text-center">
            <div className="mb-6">
              <svg
                className="mx-auto h-12 w-12 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Password Reset Link Sent
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              We ve sent a password reset link to your email. Please check your
              inbox and follow the instructions to reset your password.
            </p>
            <Link href="/auth/login">
              <Button color="primary" className="w-full py-3">
                Back to Login
              </Button>
            </Link>
          </div>
        ) : (
          <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-6 sm:p-10 rounded-xl shadow-md">
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
                Forgot your password?
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
                Don&apos;t worry, we will send you reset instructions.
              </p>
            </div>
            <FXForm
              onSubmit={handleSubmit}
              resolver={zodResolver(forgetPasswordSchema)}
            >
              <div className="mt-4">
                <FXInput type="email" name="email" label="Email Address" />
              </div>
              <div className="mt-4">
                <Button
                  isLoading={forgetPasswordLoading}
                  type="submit"
                  color="primary"
                  className="w-full py-3 bg-default-500 dark:bg-default-200"
                >
                  Reset Password
                </Button>
              </div>
            </FXForm>
            <div className="text-center">
              <Link
                href="/auth/login"
                className="font-medium  text-default-500 hover:text-primary-500 dark:text-default-400 dark:hover:text-default-300"
              >
                Back to Login
              </Link>
            </div>
          </div>
        )}
      </section>
    </Container>
  );
};

export default ForgetPasswordPage;
