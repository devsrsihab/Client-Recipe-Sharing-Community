"use client";

import { useUser } from "@/src/context/user.provider";
import { useGetUserSingleInfo } from "@/src/hooks/userProfile.hook";
import { Avatar } from "@nextui-org/avatar";

const DashboardOverview = () => {
  const { user } = useUser();

  const {
    data,
    isLoading: isSingleUserLoading,
    isError: isSingleUserError,
  } = useGetUserSingleInfo(user?._id as string);

  const userData = data?.data;

  // loading state
  if (isSingleUserLoading) {
    return (
      <div className="flex justify-center items-center h-screen dark:bg-gray-800">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900 dark:border-gray-100"></div>
      </div>
    );
  }

  // is error
  if (isSingleUserError) {
    return (
      <div className="text-center text-red-600 dark:text-red-400 text-xl mt-10">
        Error loading user.
      </div>
    );
  }

  console.log(userData);

  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md">
      <div className="flex flex-col sm:flex-row items-center sm:justify-between mb-6">
        {/* User Info */}
        <div className="flex flex-col sm:flex-row items-center text-center sm:text-left">
          {userData?.profilePicture === "" ? (
            <Avatar
              size="lg"
              className="mb-4 sm:mb-0 sm:mr-4"
              name={userData?.name?.firstName}
            />
          ) : (
            <img
              src={userData?.profilePicture}
              alt="User Avatar"
              className="w-20 h-20 mb-4 sm:mb-0 sm:mr-6 rounded-full border-4 border-blue-500"
            />
          )}
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-200">
              Welcome back,{" "}
              <span className="capitalize">
                {userData?.name?.firstName ?? ""}{" "}
                {userData?.name?.lastName ?? ""}
              </span>
              !
            </h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1">
              {userData?.email ?? ""}
            </p>
            <p className="text-xs sm:text-sm text-blue-500 dark:text-blue-400 mt-1 capitalize">
              Role: {userData?.role ?? ""}
            </p>
          </div>
        </div>
      </div>
      {/* Stats or Quick Links */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300">
              Account Status
            </p>
            <p className="text-lg sm:text-2xl capitalize font-bold text-green-500">
              Active
            </p>
          </div>
          <div className="text-blue-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h3v10H3zm7-7h3v17h-3zM13 4h3v17h-3zM21 8h-3v13h3z"
              />
            </svg>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300">
              Followers
            </p>
            <p className="text-lg sm:text-2xl font-bold text-gray-800 dark:text-gray-200">
              {userData?.followers.length ?? 0}
            </p>
          </div>
          <div className="text-blue-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300">
              Following
            </p>
            <p className="text-lg sm:text-2xl font-bold text-gray-800 dark:text-gray-200">
              {userData?.following.length ?? 0}
            </p>
          </div>
          <div className="text-green-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
