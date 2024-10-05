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
import { IUser } from "@/src/types";
import { userRenderCell } from "./UserTableColumn";
import { useGetAllUsers } from "@/src/hooks/user.hook";

const UserDataTable = () => {
  const { data, isLoading } = useGetAllUsers();
  const [page, setPage] = useState(1);

  const users = data?.data;
  const rowsPerPage = 5;

  const pages = Math.ceil(users?.length / rowsPerPage);

  const slicesUsers = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return users?.slice(start, end);
  }, [page, users]);

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
          users?.length > 0 ? (
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
          <TableColumn key="profilePicture">Image</TableColumn>
          <TableColumn key="name">Name</TableColumn>
          <TableColumn key="email">Email</TableColumn>
          <TableColumn key="role">Role</TableColumn>
          <TableColumn key="status">Status</TableColumn>
          <TableColumn key="actions">Actions</TableColumn>
        </TableHeader>
        <TableBody
          items={slicesUsers ?? []}
          isLoading={isLoading}
          loadingContent={<Spinner label="Loading..." />}
          emptyContent={"No users found"}
        >
          {(user: IUser) => (
            <TableRow key={user._id}>
              {(columnKey) => (
                <TableCell>{userRenderCell(user, columnKey) as any}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserDataTable;
