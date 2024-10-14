"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import UserProvider from "@/src/context/user.provider";
import { Toaster } from "sonner";
import { ProvidersProps } from "@/src/types";

const queryClient = new QueryClient();

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Add a null check here */}
      {router && (
        <UserProvider>
          <Toaster richColors />
          <ReactQueryDevtools initialIsOpen={true} />
          <NextUIProvider navigate={router.push}>
            <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
          </NextUIProvider>
        </UserProvider>
      )}
    </QueryClientProvider>
  );
}
