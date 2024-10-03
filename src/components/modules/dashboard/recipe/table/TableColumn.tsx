"use client";

import { IRecipe } from "@/src/types";
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import { Tooltip } from "@nextui-org/tooltip";
import Link from "next/link";


export const renderCell = (recipe: IRecipe, columnKey: React.Key) => {
  const cellValue = recipe[columnKey as keyof IRecipe]

  switch (columnKey) {
     case "title":
       return <> {cellValue}</>;
     case "category":
       return <> {cellValue}</>
     case "prepTime":
       return <> {cellValue}</>;
       case "cookTime":
         return <> {cellValue}</>;

    case 'actions':
      return (
        <div className='relative flex items-center gap-4'>
            <Link href={`/admin/recipe-managment/view/${recipe._id}`} className='cursor-pointer text-lg text-default-400 active:opacity-50'>
              <EyeIcon className="size-5" />
            </Link>
            <Link href={`/admin/recipe-managment/edit/${recipe._id}`} className='cursor-pointer text-lg text-default-400 active:opacity-50'>
              <PencilIcon className="size-5" />
            </Link>
            <span className='cursor-pointer text-lg text-danger active:opacity-50'>
              <TrashIcon className="size-5" />
            </span>
        </div>
      )
    default:
      return cellValue
  }
}
