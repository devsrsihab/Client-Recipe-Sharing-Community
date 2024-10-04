"use client";

import DeleteRecipeModal from "@/src/components/modal/DeleteRecipeModal";
import FXDropSelector from "@/src/components/UI/FXDropSelector";
import { ICategory, IUser } from "@/src/types";
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import { Avatar } from "@nextui-org/avatar";
import { Image } from "@nextui-org/image";
import Link from "next/link";

export const userRenderCell = (user: IUser, columnKey: React.Key) => {
  const cellValue = user[columnKey as keyof IUser];

  const userRoles = [
    { key: "admin", value: "admin" },
    { key: "user", value: "user" },
  ];

  const userStatus = [
    { key: "active", value: "active" },
    { key: "pending", value: "pending" },
    { key: "suspended", value: "suspended" },
    { key: "premium", value: "premium" },
    { key: "blocked", value: "blocked" },
  ];

  // role update handler
  const handleRoleUpdate = (role: string) => {
    console.log(role);
  };

  switch (columnKey) {
    case "profilePicture":
      return (
        <>
          {user.profilePicture ? (
            <Image
              isBlurred={cellValue ? false : true}
              src={cellValue as string}
              alt="user"
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
          {user.name.firstName} {user.name.lastName}
        </>
      );
    case "email":
      return <> {cellValue}</>;

    case "role":
      return (
        <div className="flex ">
          <FXDropSelector
            menuItems={userRoles}
            defaultItem={cellValue as string}
            label="Select A Role"
            getValueFunction={handleRoleUpdate}
          />
        </div>
      );
    case "status":
      return (
        <>
          <FXDropSelector
            menuItems={userStatus}
            defaultItem={cellValue as string}
            label="Select A Role"
            getValueFunction={handleRoleUpdate}
          />
        </>
      );

    case "actions":
      return (
        <div className="relative flex items-center gap-4">
          <Link
            href={`/admin/recipe-managment/view/${user._id}`}
            className="cursor-pointer text-lg text-default-400 active:opacity-50"
          >
            <EyeIcon className="size-5" />
          </Link>

          <Link
            href={`/admin/recipe-managment/edit/${user._id}`}
            className="cursor-pointer text-lg text-default-400 active:opacity-50"
          >
            <PencilIcon className="size-5" />
          </Link>

          <span className="cursor-pointer text-lg text-danger active:opacity-50">
            <DeleteRecipeModal
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
