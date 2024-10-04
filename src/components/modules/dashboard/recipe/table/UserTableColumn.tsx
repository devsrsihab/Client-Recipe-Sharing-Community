"use client";

import DeleteRecipeModal from "@/src/components/modal/DeleteRecipeModal";
import FXDropDown from "@/src/components/UI/FXDropDown";
import FXDropSelector from "@/src/components/UI/FXDropSelector";
import { ICategory, IRecipe } from "@/src/types";
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import { Image } from "@nextui-org/image";
import Link from "next/link";

export const renderCell = (recipe: IRecipe, columnKey: React.Key) => {
  const cellValue = recipe[columnKey as keyof IRecipe];

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
    case "image":
      return (
        <Image
          isBlurred={cellValue ? false : true}
          src={cellValue as string}
          alt="recipe"
          width={100}
          height={70}
        />
      );
    case "title":
      return <> {cellValue}</>;
    case "category":
      return <> {cellValue ? (cellValue as Partial<ICategory>).name : "N/A"}</>;
    case "status":
      return (
        <>
          <FXDropSelector
            menuItems={userStatus}
            defaultItem={"active"}
            label="Select A Role"
            getValueFunction={handleRoleUpdate}
          />
        </>
      );
    case "role":
      return (
        <div className="flex ">
          <FXDropSelector
            menuItems={userRoles}
            defaultItem={"user"}
            label="Select A Role"
            getValueFunction={handleRoleUpdate}
          />
        </div>
      );

    case "actions":
      return (
        <div className="relative flex items-center gap-4">
          <Link
            href={`/admin/recipe-managment/view/${recipe._id}`}
            className="cursor-pointer text-lg text-default-400 active:opacity-50"
          >
            <EyeIcon className="size-5" />
          </Link>

          <Link
            href={`/admin/recipe-managment/edit/${recipe._id}`}
            className="cursor-pointer text-lg text-default-400 active:opacity-50"
          >
            <PencilIcon className="size-5" />
          </Link>

          <span className="cursor-pointer text-lg text-danger active:opacity-50">
            <DeleteRecipeModal
              buttonContent={<TrashIcon className="size-5" />}
              recipeid={recipe?._id}
            />
          </span>
        </div>
      );
    default:
      return cellValue;
  }
};
