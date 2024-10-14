"use client";

import { useRouter } from "next/router";
import Link from "next/link";

const ErrorPage = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          Oops! Something went wrong
        </h1>
        <p className="text-gray-600 mb-4">
          We apologize for the inconvenience. An error occurred while processing
          your request.
        </p>
        {error.digest && (
          <p className="text-sm text-gray-500 mb-4">Error ID: {error.digest}</p>
        )}
        <div className="flex flex-col space-y-2">
          <button
            onClick={() => reset()}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
          >
            Try again
          </button>
          <button
            onClick={() => router.push("/")}
            className="bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 transition-colors"
          >
            Go to homepage
          </button>
          <Link
            href="/contact"
            className="text-blue-500 hover:underline text-center"
          >
            Contact support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
