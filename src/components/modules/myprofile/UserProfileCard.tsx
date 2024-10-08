"use client";

import {
  useFollowUserMutation,
  useGetUserSingleInfo,
  useUnfollowUserMutation,
} from "@/src/hooks/userProfile.hook";
import { Card } from "@nextui-org/card";
import { Skeleton } from "@nextui-org/skeleton";
import { UserPlusIcon, UserMinusIcon } from "@heroicons/react/24/outline";
import { useState, useEffect, useCallback } from "react";

import { useUser } from "@/src/context/user.provider";
import { Button } from "@nextui-org/button";

interface UserProfileCardProps {
  id: string;
}

const UserProfileCard = ({ id }: UserProfileCardProps) => {
  const { user: currentUser } = useUser();
  const {
    data,
    isLoading: isSingleUserLoading,
    isError: isSingleUserError,
  } = useGetUserSingleInfo(id);

  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [localIsFollowing, setLocalIsFollowing] = useState(false);

  const {
    mutate: handleFollowUser,
    isSuccess: isFollowSuccess,
    isPending: isFollowPending,
  } = useFollowUserMutation();
  const {
    mutate: handleUnfollowUser,
    isSuccess: isUnfollowSuccess,
    isPending: isUnfollowPending,
  } = useUnfollowUserMutation();
  const userData = data?.data;
  const isFollowing = userData?.followers.includes(currentUser?._id);

  useEffect(() => {
    if (data && currentUser) {
      setIsOwnProfile(currentUser._id === id);
      setLocalIsFollowing(isFollowing);
      setIsDataLoaded(true);
    }
  }, [data, currentUser, id, isFollowing]);

  useEffect(() => {
    if (isFollowSuccess) {
      setLocalIsFollowing(true);
    }
  }, [isFollowSuccess]);

  useEffect(() => {
    if (isUnfollowSuccess) {
      setLocalIsFollowing(false);
    }
  }, [isUnfollowSuccess]);

  const toggleFollow = useCallback(() => {
    if (localIsFollowing) {
      handleUnfollowUser(userData?._id);
    } else {
      handleFollowUser(userData?._id);
    }
  }, [localIsFollowing, handleUnfollowUser, handleFollowUser, userData?._id]);

  if (isSingleUserLoading || !isDataLoaded) {
    return (
      <Card className="max-w-sm w-full mx-auto mt-16 bg-white dark:bg-gray-800 shadow-xl rounded-lg text-gray-900 dark:text-gray-100 overflow-hidden">
        <Skeleton className="w-full h-32">
          <div className="h-32 bg-default-300"></div>
        </Skeleton>
        <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white dark:border-gray-800 rounded-full overflow-hidden">
          <Skeleton className="w-full h-full rounded-full">
            <div className="w-full h-full bg-default-200"></div>
          </Skeleton>
        </div>
        <div className="text-center mt-2 px-4 space-y-2">
          <Skeleton className="w-3/4 mx-auto">
            <div className="h-6 bg-default-200"></div>
          </Skeleton>
          <Skeleton className="w-1/2 mx-auto">
            <div className="h-4 bg-default-200"></div>
          </Skeleton>
          <Skeleton className="w-5/6 mx-auto">
            <div className="h-4 bg-default-200"></div>
          </Skeleton>
        </div>
        <div className="py-4 mt-2 flex items-center justify-around">
          <Skeleton className="w-1/4">
            <div className="h-12 bg-default-200"></div>
          </Skeleton>
          <Skeleton className="w-1/4">
            <div className="h-12 bg-default-200"></div>
          </Skeleton>
        </div>
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 mx-8 mt-2">
          <Skeleton className="w-full">
            <div className="h-10 bg-default-200 rounded-full"></div>
          </Skeleton>
        </div>
      </Card>
    );
  }

  if (isSingleUserError || !data) {
    return <div>Error loading user profile</div>;
  }

  return (
    <Card className="max-w-sm mx-auto mt-16 bg-white dark:bg-gray-800 shadow-xl rounded-lg text-gray-900 dark:text-gray-100 overflow-hidden">
      <div className="rounded-t-lg h-32 overflow-hidden">
        <img
          className="object-cover object-top w-full"
          src={
            userData?.coverPhoto ||
            "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
          }
          alt="Cover Photo"
        />
      </div>
      <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white dark:border-gray-800 rounded-full overflow-hidden">
        <img
          src={
            userData?.profilePicture ||
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
          }
          alt={`${userData?.name?.firstName || ""} ${
            userData?.name?.lastName || ""
          }`}
        />
      </div>
      <div className="text-center mt-2 px-4">
        <h2 className="font-semibold text-xl">
          {`${(userData?.name?.firstName || "").toUpperCase()} ${(
            userData?.name?.lastName || ""
          ).toUpperCase()}`}
        </h2>
        <p className="text-gray-500 dark:text-gray-400 font-medium">
          @{(userData?.username || "").toUpperCase()}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
          {userData?.bio || "No bio available"}
        </p>
      </div>
      <ul className="py-4 mt-2 text-gray-700 dark:text-gray-300 flex items-center justify-around">
        <li className="flex flex-col items-center justify-around">
          Following
          <div>{userData?.following.length}</div>
        </li>
        <li className="flex flex-col items-center justify-between">
          Followers
          <div>{userData?.followers.length}</div>
        </li>
      </ul>

      {!isOwnProfile && isDataLoaded && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 mx-8 mt-2">
          <Button
            onClick={toggleFollow}
            isLoading={isFollowPending || isUnfollowPending}
            className={`w-full block mx-auto rounded-full font-semibold text-sm px-6 py-2 transition-all duration-200 ease-in-out flex items-center justify-center text-white ${
              localIsFollowing
                ? "bg-red-500 hover:bg-red-600"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {localIsFollowing ? (
              <>
                <UserMinusIcon className="w-5 h-5 mr-2" />
                Unfollow
              </>
            ) : (
              <>
                <UserPlusIcon className="w-5 h-5 mr-2" />
                Follow
              </>
            )}
          </Button>
        </div>
      )}
    </Card>
  );
};

export default UserProfileCard;
