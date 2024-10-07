"use client";

import { useGetUserSingleInfo } from "@/src/hooks/userProfile.hook";
import { Card } from "@nextui-org/card";
import { Skeleton } from "@nextui-org/skeleton";
import {
  Square3Stack3DIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/button";
import Link from "next/link";

const UserProfileCard = () => {
  const {
    data,
    isLoading: isSingleUserLoading,
    isError: isSingleUserError,
  } = useGetUserSingleInfo();

  const userData = data?.data;

  if (isSingleUserLoading) {
    return (
      <Card className="max-w-sm flex-1 p-4 space-y-5" radius="lg">
        <Skeleton className="rounded-lg">
          <div className="h-64 rounded-lg bg-default-300"></div>
        </Skeleton>
        <div className="space-y-3">
          <Skeleton className="w-3/4 rounded-lg">
            <div className="h-8 w-3/4 rounded-lg bg-default-200"></div>
          </Skeleton>
          <Skeleton className="w-1/2 rounded-lg">
            <div className="h-4 w-1/2 rounded-lg bg-default-200"></div>
          </Skeleton>
          <Skeleton className="w-full rounded-lg">
            <div className="h-16 w-full rounded-lg bg-default-200"></div>
          </Skeleton>
          <div className="flex justify-center space-x-4">
            <Skeleton className="w-1/4 rounded-lg">
              <div className="h-12 w-full rounded-lg bg-default-300"></div>
            </Skeleton>
            <Skeleton className="w-1/4 rounded-lg">
              <div className="h-12 w-full rounded-lg bg-default-300"></div>
            </Skeleton>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <>
      {/* Profile Card */}
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <div className="relative">
          <img
            className="w-full clippy"
            src={
              userData?.profilePicture ||
              "https://via.placeholder.com/500x350.png?text=No+Profile+Picture"
            }
            alt={`${userData?.name?.firstName || ""} ${
              userData?.name?.lastName || ""
            }`}
          />
          <div className="clippy absolute bottom-0 left-0 top-0 right-0 bg-blue-700 bg-opacity-50 p-4 text-white flex flex-col justify-end items-center"></div>
          <div className="absolute bottom-0 right-0 mb-6 mr-6 rounded-full h-16 w-16 flex items-center bg-green-400 justify-center text-4xl font-thin text-white shadow-2xl">
            +
          </div>
        </div>
        <div className="pt-3 pb-5 px-5 flex flex-col items-center">
          <p className="font-bold text-3xl">{`${
            userData?.name?.firstName || ""
          } ${userData?.name?.lastName || ""}`}</p>
          <p className="text-gray-500 mb-2">{userData?.username}</p>
          <p className="text-center mb-4">{userData?.bio}</p>

          <div className="mt-5 flex flex-row justify-center items-start">
            <div className="px-3 text-center">
              <p className="text-gray-500">Following</p>
              <b className="text-2xl">{userData?.following.length}</b>
            </div>
            <div className="px-3 text-center">
              <p className="text-gray-500">Followers</p>
              <b className="text-2xl">{userData?.followers.length}</b>
            </div>
          </div>

          {/* New buttons */}
          <div className="flex gap-4 mt-6">
            <Button
              color="primary"
              variant="shadow"
              size="lg"
              startContent={<Square3Stack3DIcon className="w-5 h-5" />}
            >
              <Link href="/user/dashboard">Dashboard</Link>
            </Button>
            <Button
              color="secondary"
              variant="bordered"
              size="lg"
              endContent={<PencilSquareIcon className="w-5 h-5" />}
            >
              <Link href="/user/profile/edit">Edit Profile</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfileCard;
