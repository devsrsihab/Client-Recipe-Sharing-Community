"use client";

import DeleteRecipeModal from "@/src/components/modal/DeleteRecipeModal";
import { ICategory, IRecipe } from "@/src/types";
import {
  EyeIcon,
  PencilIcon,
  TrashIcon,
  XCircleIcon,
} from "@heroicons/react/20/solid";
import {
  CheckCircleIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
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
          className="object-cover"
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
        case "active": {
          statusColor = "green";
          StatusIcon = CheckCircleIcon;
          break;
        }
        case "inactive": {
          statusColor = "red";
          StatusIcon = XCircleIcon;
          break;
        }
        // Add other cases as needed
        default: {
          statusColor = "gray";
          StatusIcon = QuestionMarkCircleIcon;
        }
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
            href={`/user/recipe-managment/view/${recipe._id}`}
            className="cursor-pointer text-lg text-default-400 active:opacity-50"
          >
            <EyeIcon className="size-5" />
          </Link>

          <Link
            href={`/user/recipe-managment/edit/${recipe._id}`}
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
