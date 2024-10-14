"use client";

import DeleteRecipeModal from "@/src/components/modal/DeleteRecipeModal";
import { ICategory, IRecipe } from "@/src/types";
import {
  EyeIcon,
  PencilIcon,
  TrashIcon,
  ClockIcon,
  XCircleIcon,
  GlobeAltIcon,
  LockClosedIcon,
} from "@heroicons/react/20/solid";
import { Image } from "@nextui-org/image";
import Link from "next/link";
import React from "react";

export const renderCell = (recipe: IRecipe, columnKey: React.Key) => {
  const cellValue = recipe[columnKey as keyof IRecipe];

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
    case "status": {
      let statusColor: string;
      let StatusIcon: React.ElementType;

      switch (cellValue) {
        case "published":
          statusColor = "text-green-600 bg-green-100";
          StatusIcon = GlobeAltIcon;
          break;
        case "pending":
          statusColor = "text-yellow-600 bg-yellow-100";
          StatusIcon = ClockIcon;
          break;
        case "private":
          statusColor = "text-purple-600 bg-purple-100";
          StatusIcon = LockClosedIcon;
          break;
        case "unpublished":
          statusColor = "text-red-600 bg-red-100";
          StatusIcon = XCircleIcon;
          break;
        default:
          statusColor = "text-gray-600 bg-gray-100";
          StatusIcon = ClockIcon;
      }

      return (
        <div
          className={`inline-flex items-center gap-1 px-2 py-1 rounded-full ${statusColor}`}
        >
          <StatusIcon className="size-3" />
          <span className="text-xs font-medium capitalize">
            {cellValue as string}
          </span>
        </div>
      );
    }
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

          <span className="cursor-pointer text-lg  active:opacity-50">
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
