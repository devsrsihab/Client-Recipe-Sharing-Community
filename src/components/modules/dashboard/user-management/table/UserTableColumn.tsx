"use client";

import UserDeleteModal from "@/src/components/modal/UserDeleteModal";
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import { Image } from "@nextui-org/image";
import Link from "next/link";
import FXDropRoleAndStatusChange from "../FXDropRoleAndStatusChange";
import { IUser } from "@/src/types/post.type";
import React from "react";

export const userRenderCell = (user: IUser, columnKey: React.Key) => {
  const cellValue = user[columnKey as keyof IUser];

  const userRoles = [
    { key: "admin", value: "admin" },
    { key: "user", value: "user" },
  ];

  const userStatus = [
    { key: "active", value: "active" },
    { key: "pending", value: "pending" },
    { key: "blocked", value: "blocked" },
  ];

  switch (columnKey) {
    case "profilePicture":
      return (
        <>
          {user.profilePicture ? (
            <Image
              isBlurred={cellValue ? false : true}
              src={cellValue as string}
              alt="user"
              className="object-contain rounded"
              width={100}
              height={70}
            />
          ) : (
            <div className="w-[100px] h-[70px] bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center">
              <div className="w-12 h-12 bg-gray-300 dark:bg-gray-700 rounded-full" />
            </div>
          )}
        </>
      );
    case "name":
      return (
        <>
          <span className="capitalize">
            {user.name.firstName} {user.name.lastName}
          </span>
        </>
      );
    case "email":
      return <> {cellValue}</>;

    case "role":
      return (
        <div className="flex ">
          <FXDropRoleAndStatusChange
            menuItems={userRoles}
            defaultItem={cellValue as string}
            label="Select A Role"
            userId={user._id}
            whichFor="role"
          />
        </div>
      );
    case "status":
      return (
        <>
          <FXDropRoleAndStatusChange
            menuItems={userStatus}
            defaultItem={cellValue as string}
            label="change A Status"
            userId={user._id}
            whichFor="status"
          />
        </>
      );

    case "actions":
      return (
        <div className="relative flex items-center gap-4">
          <Link
            href={`/admin/user-management/view/${user._id}`}
            className="cursor-pointer text-lg text-default-400 active:opacity-50"
          >
            <EyeIcon className="size-5" />
          </Link>

          <Link
            href={`/admin/user-management/edit/${user._id}`}
            className="cursor-pointer text-lg text-default-400 active:opacity-50"
          >
            <PencilIcon className="size-5" />
          </Link>

          <span className="cursor-pointer text-lg text-danger active:opacity-50">
            <UserDeleteModal
              buttonContent={<TrashIcon className="size-5" />}
              recipeid={user?._id}
            />
          </span>
        </div>
      );
    default:
      return cellValue;
  }
};
