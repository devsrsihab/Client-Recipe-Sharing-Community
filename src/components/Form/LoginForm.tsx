"use client";

import { Button } from "@nextui-org/button";
import Container from "../UI/Container";
import FXForm from "./FXForm";
import FXInput from "./FXInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler } from "react-hook-form";
import loginValidationSchema from "@/src/schemas/login.schema";
import Link from "next/link";
import { useUserLogin } from "@/src/hooks/auth.hook";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useUser } from "@/src/context/user.provider";

const LoginForm = () => {
  const { mutate: handleUserLogin, isPending, isSuccess } = useUserLogin();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams?.get("redirect");
  const { setIsLoading: userLoading } = useUser();

  // handle submit form
  const handleSubmit: SubmitHandler<FieldValues> = (data) => {
    handleUserLogin(data);
    userLoading(true);
  };

  // if successfully login
  useEffect(() => {
    if (!isPending && isSuccess) {
      if (redirect) {
        router.push(redirect);
      } else {
        router.push("/");
      }
    }
  }, [isPending, isSuccess]);

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
              Foundx
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
                className="my-6"
                radius="none"
              >
                Sign in
              </Button>

              <p className="text-sm font-light  text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Link
                  href="/auth/register"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </Link>
              </p>
            </FXForm>
          </div>
          {/* Right side: Image */}
          <div
            className="w-1/2 bg-cover bg-center"
            style={{
              backgroundImage: "url('/login-image.webp')",
            }}
          ></div>
        </div>
      </section>
    </Container>
  );
};

export default LoginForm;
