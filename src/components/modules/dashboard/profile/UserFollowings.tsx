"use client";
import { useGetUserFollowing } from "@/src/hooks/userProfile.hook";
import { IUser } from "@/src/types/post.type";

const UserFollowings = () => {
  const { data, isLoading, isError } = useGetUserFollowing();

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

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
        Followings
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.data.map((follower: IUser) => (
          <div
            key={follower._id}
            className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg flex items-center space-x-4"
          >
            <div className="flex-shrink-0">
              <img
                src={
                  follower.profilePicture || "https://via.placeholder.com/80"
                }
                alt={`${follower.name.firstName} ${follower.name.lastName}`}
                className="w-12 h-12 rounded-full object-cover"
              />
            </div>
            <div className="flex-grow">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                {follower.name.firstName} {follower.name.lastName}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                @{follower?.username}
              </p>
            </div>
            <div className="flex-shrink-0 capitalize">
              <span
                className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                  follower?.status || ""
                )}`}
              >
                {follower.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100";
    case "pending":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100";
    case "premium":
      return "bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100";
  }
};

export default UserFollowings;
