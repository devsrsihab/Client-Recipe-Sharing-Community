"use client";

import { Button } from "@nextui-org/button";
import Container from "@/src/components/UI/Container";
import FXForm from "@/src/components/Form/FXForm";
import FXInput from "@/src/components/Form/FXInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema } from "@/src/schemas/passwordChange.schema";
import { useResetPasswordMutation } from "@/src/hooks/auth.hook";
import { useEffect, useState } from "react";

const ResetPassword = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useState<URLSearchParams | null>(
    null
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSearchParams(new URLSearchParams(window.location.search));
    }
  }, []);

  useEffect(() => {
    if (searchParams) {
      setEmail(searchParams.get("email"));
      setToken(searchParams.get("token"));
    }
  }, [searchParams]);

  // forget password mutation
  const { mutate: resetPassword, isPending: resetPasswordLoading } =
    useResetPasswordMutation();

  // handle submit
  const handleSubmit: SubmitHandler<FieldValues> = (data: any) => {
    if (email && token) {
      resetPassword({
        resetData: { email, newPassword: data.password },
        token: token,
      });
    }
  };

  return (
    <Container>
      <section className="bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
              Reset your password
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
              Enter your email and new password to reset.
            </p>
          </div>
          <FXForm
            onSubmit={handleSubmit}
            resolver={zodResolver(resetPasswordSchema)}
          >
            <div className="mt-6">
              <FXInput type="password" name="password" label="New Password" />
            </div>
            <div className="mt-6">
              <FXInput
                type="password"
                name="confirmPassword"
                label="Confirm New Password"
              />
            </div>
            <div className="mt-6">
              <Button
                isLoading={resetPasswordLoading}
                type="submit"
                color="primary"
                className="w-full py-3 text-lg font-semibold"
              >
                Reset Password
              </Button>
            </div>
          </FXForm>
        </div>
      </section>
    </Container>
  );
};

export default ResetPassword;
