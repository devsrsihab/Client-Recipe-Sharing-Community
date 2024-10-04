"use client";

import { useGetRecipes } from "@/src/hooks/recipe.hook";
import { IRecipe } from "@/src/types/recipe.type";
import { Pagination } from "@nextui-org/pagination";
import { Spinner } from "@nextui-org/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import React, { useMemo, useState } from "react";
import { renderCell } from "./TableColumn";
import { Button } from "@nextui-org/button";
import Link from "next/link";

const RecipeDataTable = () => {
  const { data, isLoading } = useGetRecipes();
  const [page, setPage] = useState(1);

  const recipes = data?.data;
  const rowsPerPage = 5;

  const pages = Math.ceil(recipes?.length / rowsPerPage);

  const slicesRecipes = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return recipes?.slice(start, end);
  }, [page, recipes]);

  console.log(recipes);

  return (
    <div className="relative">
      <Table
        aria-label="Recipe table with pagination"
        // heading content
        topContent={
          <div className="flex justify-end">
            <Button>
              <Link href="/admin/recipe-managment/create">Add Recipe</Link>
            </Button>
          </div>
        }
        bottomContent={
          recipes?.length > 0 ? (
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
              />
            </div>
          ) : null
        }
      >
        <TableHeader>
          <TableColumn key="image">Image</TableColumn>
          <TableColumn key="title">Title</TableColumn>
          <TableColumn key="category">Category</TableColumn>
          <TableColumn key="prepTime">Prep Time</TableColumn>
          <TableColumn key="cookTime">Cook Time</TableColumn>
          <TableColumn key="actions">Actions</TableColumn>
        </TableHeader>
        <TableBody
          items={slicesRecipes ?? []}
          isLoading={isLoading}
          loadingContent={<Spinner label="Loading..." />}
          emptyContent={"No recipes found"}
        >
          {(recipe: IRecipe) => (
            <TableRow key={recipe._id}>
              {(columnKey) => (
                <TableCell>{renderCell(recipe, columnKey) as any}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default RecipeDataTable;
