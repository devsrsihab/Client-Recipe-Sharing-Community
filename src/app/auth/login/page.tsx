"use client";

import { Button } from "@nextui-org/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler } from "react-hook-form";
import loginValidationSchema from "@/src/schemas/login.schema";
import Link from "next/link";
import { useUserLogin } from "@/src/hooks/auth.hook";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUser } from "@/src/context/user.provider";
import Container from "@/src/components/UI/Container";
import FXForm from "@/src/components/Form/FXForm";
import FXInput from "@/src/components/Form/FXInput";
import { toast } from "sonner";

const AuthLoginPage = () => {
  const {
    mutate: handleUserLogin,
    isPending,
    isSuccess,
    data: responseData,
  } = useUserLogin();
  const router = useRouter();
  const { setIsLoading: userLoading } = useUser();

  // show error message according to response data
  useEffect(() => {
    if (responseData && !responseData?.success) {
      toast.error(responseData?.message);
    } else if (responseData?.success) {
      toast.success("Login Successfully");
      if (!isPending && isSuccess) {
        const redirect = getRedirectParam();
        if (redirect) {
          // Only redirect if the parameter is present and not empty
          router.push(redirect);
        } else {
          router.push("/");
        }
        // If redirect is an empty string, do nothing (stay on the current page)
        userLoading(false);
      }
    }
  }, [responseData, isPending, isSuccess, router, userLoading]);

  // Get the redirect parameter from the URLL
  const getRedirectParam = () => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get("redirect");
    }
    return null;
  };

  // handle submit form
  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    handleUserLogin(data);
    userLoading(true);
  };

  // if successfully login
  useEffect(() => {
    if (!isPending && isSuccess) {
      const redirect = getRedirectParam();
      if (redirect) {
        // Only redirect if the parameter is present and not empty
        router.push(redirect);
      }
      // If redirect is an empty string, do nothing (stay on the current page)
      userLoading(false);
    }
  }, [isPending, isSuccess, router, userLoading]);

  return (
    <Container>
      <section className="bg-gray-50 dark:bg-gray-900 h-screen flex items-center">
        <div className="flex w-full h-full">
          {/* Left side: Login Form */}
          <div className="w-1/2 bg-white dark:bg-gray-800 p-8 flex flex-col justify-center">
            <a
              href="#"
              className="flex items-center mb-6 text-2xl font-semibold text-orange-400"
            >
              SRS RecipeX
            </a>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mb-6">
              Sign in to your account
            </h1>
            <FXForm
              onSubmit={handleSubmit}
              defaultValues={{
                email: "sohan@gmail.com",
                password: "123456789",
              }}
              resolver={zodResolver(loginValidationSchema)}
            >
              <FXInput
                variant="underlined"
                name="email"
                label="Email"
                type="email"
              />
              <FXInput
                variant="underlined"
                name="password"
                label="Password"
                type="password"
              />

              <Button
                disabled={isPending}
                isLoading={isPending}
                type="submit"
                className="w-full mt-6"
                radius="none"
              >
                Sign in
              </Button>

              <div className="flex justify-between items-center mt-4 mb-6">
                <Link
                  href="/auth/forget-password"
                  className="text-sm text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot Password?
                </Link>
                <Link
                  href="/auth/register"
                  className="text-sm text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </Link>
              </div>
            </FXForm>
          </div>
          {/* Right side: Image */}
          <div
            className="w-1/2 bg-cover bg-center"
            style={{
              backgroundImage: "url('/login-image.webp')",
            }}
          />
        </div>
      </section>
    </Container>
  );
};

export default AuthLoginPage;
