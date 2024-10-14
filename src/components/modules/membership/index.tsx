"use client";

import { useUser } from "@/src/context/user.provider";
import { usePaymentRedirect } from "@/src/hooks/payment.hook";
import { Button } from "@nextui-org/button";
import Link from "next/link";

const UserMembershipComponent = () => {
  const { user } = useUser();
  const { mutate: paymentRedirect, isPending: isPaymentRedirectPending } =
    usePaymentRedirect();

  const handlePaymentRedirect = () => {
    user?.email && paymentRedirect(user?.email);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto bg-white dark:bg-[#0e1629] rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 md:p-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
            Premium Membership
          </h2>
          <div className="mb-6">
            <p className="text-3xl font-bold  ">
              ৳8,500
              <span className="text-lg font-normal text-gray-600 dark:text-gray-400">
                /year
              </span>
            </p>
          </div>
          <ul className="mb-8 space-y-2">
            <li className="flex items-center text-gray-600 dark:text-gray-300">
              <svg
                className="w-5 h-5 mr-2 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Unlimited access to all features
            </li>
            <li className="flex items-center text-gray-600 dark:text-gray-300">
              <svg
                className="w-5 h-5 mr-2 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Priority customer support
            </li>
            <li className="flex items-center text-gray-600 dark:text-gray-300">
              <svg
                className="w-5 h-5 mr-2 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Exclusive content and resources
            </li>
          </ul>
          <Button
            onClick={handlePaymentRedirect}
            isLoading={isPaymentRedirectPending}
            className="w-full bg-[#0284c7] dark:bg-black text-white font-bold py-3 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
          >
            Upgrade to Premium
          </Button>
        </div>
        <div className="bg-gray-100 dark:bg-[#0e1629] px-6 py-4">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            By upgrading, you agree to our{" "}
            <Link
              href="/term-and-condition"
              className="text-[#38bdf8] dark:text-[#6d28d9] hover:underline"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy-and-policy"
              className="text-[#38bdf8] dark:text-[#6d28d9] hover:underline"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserMembershipComponent;
