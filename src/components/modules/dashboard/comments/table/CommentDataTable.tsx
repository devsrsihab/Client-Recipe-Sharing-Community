"use client";

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
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { IComment } from "@/src/types";
import { commentRenderCell } from "./CommentTableColumn";
import { useGetAllComments } from "@/src/hooks/comment.hook";

const CommentDataTable = () => {
  const { data, isLoading } = useGetAllComments();
  const [page, setPage] = useState(1);

  const comments = data?.data;
  const rowsPerPage = 5;

  const pages = Math.ceil(comments?.length / rowsPerPage);

  const slicesUsers = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return comments?.slice(start, end);
  }, [page, comments]);

  return (
    <div className="relative">
      <Table
        aria-label="Recipe table with pagination"
        // heading content
        topContent={
          <div className="flex justify-end">
            <Button>
              <Link href="/admin/user-management/create">Add User</Link>
            </Button>
          </div>
        }
        bottomContent={
          comments?.length > 0 ? (
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
          <TableColumn key="name">Name</TableColumn>
          <TableColumn key="text">Comment</TableColumn>
          <TableColumn key="recipe">Recipe</TableColumn>
          <TableColumn key="status">Status</TableColumn>
          <TableColumn key="actions">Actions</TableColumn>
        </TableHeader>
        <TableBody
          items={slicesUsers ?? []}
          isLoading={isLoading}
          loadingContent={<Spinner label="Loading..." />}
          emptyContent={"No users found"}
        >
          {(comment: IComment) => (
            <TableRow key={comment._id}>
              {(columnKey) => (
                <TableCell>
                  {commentRenderCell(comment, columnKey) as any}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CommentDataTable;
