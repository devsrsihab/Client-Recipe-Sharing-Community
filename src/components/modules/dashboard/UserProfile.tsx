"use client";

import { useUser } from "@/src/context/user.provider";
import { useGetUserById } from "@/src/hooks/user.hook";
import {
  UserIcon,
  EnvelopeIcon,
  CalendarIcon,
  UserGroupIcon,
  UserPlusIcon,
  CheckBadgeIcon,
  KeyIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  NoSymbolIcon,
  SparklesIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

const UserProfile = () => {
  const { user: currentUser } = useUser();
  const { data, isLoading, isError } = useGetUserById(
    currentUser?._id as string
  );

  const user = data?.data;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen dark:bg-gray-800">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900 dark:border-gray-100"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-600 dark:text-red-400 text-xl mt-10">
        Error loading user details.
      </div>
    );
  }

  const getStatusInfo = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return { color: "green", icon: CheckCircleIcon };
      case "pending":
        return { color: "yellow", icon: ClockIcon };
      case "suspended":
        return { color: "red", icon: NoSymbolIcon };
      case "premium":
        return { color: "purple", icon: SparklesIcon };
      case "expired-premium":
        return { color: "orange", icon: ExclamationTriangleIcon };
      case "blocked":
        return { color: "red", icon: XCircleIcon };
      default:
        return { color: "gray", icon: ExclamationTriangleIcon };
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 dark:bg-gray-800 dark:text-gray-100">
      <div className="bg-white dark:bg-gray-700 shadow-xl rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 h-48"></div>
        <div className="relative -mt-24 px-6">
          <div className="bg-white dark:bg-gray-800 rounded-full overflow-hidden p-2 inline-block shadow-xl">
            {user?.profilePicture ? (
              <Image
                src={user?.profilePicture}
                alt="profile"
                width={100}
                height={100}
              />
            ) : (
              <div className="w-[100px] h-[100px] bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center">
                <div className="w-12 h-12 bg-gray-300 dark:bg-gray-700 rounded-full" />
              </div>
            )}
          </div>
        </div>
        <div className="px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl capitalize font-bold text-gray-800 dark:text-gray-100">
              {user?.name.firstName} {user?.name.lastName}
            </h1>
            <Link
              className="flex items-center px-3 py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors duration-200"
              href={
                user?.role === "admin"
                  ? "/admin/profile/edit"
                  : "/user/profile/edit"
              }
            >
              <PencilIcon className="h-5 w-5 mr-2" />
              Edit Profile
            </Link>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            @{user?.username}
          </p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center">
              <EnvelopeIcon className="h-6 w-6 text-gray-500 mr-3" />
              <span className="text-gray-700 dark:text-gray-300">
                {user?.email}
              </span>
            </div>
            <div className="flex items-center">
              <CalendarIcon className="h-6 w-6 text-gray-500 mr-3" />
              <span className="text-gray-700 dark:text-gray-300">
                Joined {new Date(user?.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center">
              <UserGroupIcon className="h-6 w-6 text-gray-500 mr-3" />
              <span className="text-gray-700 dark:text-gray-300">
                {user?.followers.length} Followers
              </span>
            </div>
            <div className="flex items-center">
              <UserPlusIcon className="h-6 w-6 text-gray-500 mr-3" />
              <span className="text-gray-700 dark:text-gray-300">
                {user?.following.length} Following
              </span>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
              User Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-100 dark:bg-gray-600 p-4 rounded-lg">
                <div className="flex items-center">
                  <UserIcon className="h-6 w-6 text-indigo-500 mr-3" />
                  <span className="font-medium">User ID:</span>
                </div>
                <p className="mt-2 text-gray-700 dark:text-gray-300">
                  {user?.id}
                </p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-600 p-4 rounded-lg">
                <div className="flex items-center">
                  {(() => {
                    const { color, icon: StatusIcon } = getStatusInfo(
                      user?.status
                    );
                    return (
                      <StatusIcon
                        className={`h-6 w-6 text-${color}-500 mr-3`}
                      />
                    );
                  })()}
                  <span className="font-medium">Status:</span>
                </div>
                <p
                  className={`mt-2 text-${
                    getStatusInfo(user?.status).color
                  }-500 capitalize font-semibold`}
                >
                  {user?.status}
                </p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-600 p-4 rounded-lg">
                <div className="flex items-center">
                  <KeyIcon className="h-6 w-6 text-yellow-500 mr-3" />
                  <span className="font-medium">Role:</span>
                </div>
                <p className="mt-2 text-gray-700 dark:text-gray-300 capitalize">
                  {user?.role}
                </p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-600 p-4 rounded-lg">
                <div className="flex items-center">
                  <CheckBadgeIcon className="h-6 w-6 text-blue-500 mr-3" />
                  <span className="font-medium">Premium User:</span>
                </div>
                <p className="mt-2 text-gray-700 dark:text-gray-300">
                  {user?.isPremium ? "Yes" : "No"}
                </p>
              </div>
            </div>
          </div>

          {user?.bio && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                Bio
              </h2>
              <p className="text-gray-700 dark:text-gray-300">{user.bio}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
