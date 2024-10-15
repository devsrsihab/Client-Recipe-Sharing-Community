"use client";

import { Button } from "@nextui-org/button";
import Container from "../UI/Container";
import FXForm from "./FXForm";
import FXInput from "./FXInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import registerValidationSchema from "@/src/schemas/register.schema";
import { useUserRegistration } from "@/src/hooks/auth.hook";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const {
    mutate: handleUserRegistration,
    isPending,
    isSuccess,
  } = useUserRegistration();
  const router = useRouter();
  // handle submit form
  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    const userData = {
      ...data,
      name: { firstName: data.firstName, lastName: data.lastName },
    };
    handleUserRegistration(userData);
  };

  // if registration is successful, redirect to login page
  if (isSuccess) {
    router.push("/auth/login");
  }
  return (
    <Container>
      <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center py-8">
        <div className="flex flex-col md:flex-row w-full max-w-6xl mx-auto">
          {/* Left side: Login Form */}
          <div className="flex-1 bg-white dark:bg-gray-800 p-6 md:p-8 flex flex-col justify-center overflow-y-auto max-h-[90vh] md:max-h-none">
            <a
              href="#"
              className="flex items-center mb-4 md:mb-6 text-xl md:text-2xl font-semibold text-orange-400"
            >
              SRS RecipeX
            </a>
            <h1 className="text-lg md:text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mb-4 md:mb-6">
              Sign Up to your account
            </h1>
            <FXForm
              onSubmit={handleSubmit}
              resolver={zodResolver(registerValidationSchema)}
              isReset={isSuccess}
              defaultValues={{
                mobileNumber: "01720196645",
                email: "sohan@gmail.com",
                password: "123456789",
              }}
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <FXInput
                  variant="underlined"
                  name="firstName"
                  label="First Name"
                  type="text"
                  fxClassName="flex-1"
                />
                <FXInput
                  variant="underlined"
                  name="lastName"
                  label="Last Name"
                  type="text"
                  fxClassName="flex-1"
                />
              </div>
              <FXInput
                variant="underlined"
                name="email"
                label="Email"
                type="email"
                fxClassName="mt-4"
              />
              <FXInput
                variant="underlined"
                name="password"
                label="Password"
                type="password"
                fxClassName="mt-4"
              />

              <Button
                disabled={isPending}
                isLoading={isPending}
                type="submit"
                className="my-6 w-full"
                radius="none"
              >
                Sign Up
              </Button>

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Have an account already?{" "}
                <Link
                  href="/auth/login"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign in
                </Link>
              </p>
            </FXForm>
          </div>
          {/* Right side: Image */}
          <div
            className="hidden md:block flex-1 bg-cover bg-center"
            style={{
              backgroundImage: "url('/register.webp')",
            }}
          />
        </div>
      </section>
    </Container>
  );
};

export default RegisterForm;
