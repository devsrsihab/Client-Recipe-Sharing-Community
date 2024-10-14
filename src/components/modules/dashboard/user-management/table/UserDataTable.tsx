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
import React, { useState, useMemo } from "react";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { userRenderCell } from "./UserTableColumn";
import { useGetAllUsers } from "@/src/hooks/user.hook";
import { IUser } from "@/src/types/post.type";
import { Input } from "@nextui-org/input";
import { SearchIcon } from "@/src/components/icons";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const UserDataTable = () => {
  const { data, isLoading } = useGetAllUsers();
  const [page, setPage] = useState(1);
  const [filterValue, setFilterValue] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string>("all");

  const users = data?.data;
  const rowsPerPage = 5;

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const hasSearchFilter = Boolean(filterValue);

  const statusOptions = useMemo(
    () => [
      { name: "All", id: "all" },
      { name: "Active", id: "active" },
      { name: "Pending", id: "pending" },
      { name: "Blocked", id: "blocked" },
    ],
    []
  );

  // filter
  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...(users || [])];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter(
        (user: IUser) =>
          user.name.firstName
            .toLowerCase()
            .includes(filterValue.toLowerCase()) ||
          user.email.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filteredUsers = filteredUsers.filter(
        (user: IUser) =>
          statusFilter?.split(",").includes(user?.status as string) ?? false
      );
    }

    return filteredUsers;
  }, [users, filterValue, statusFilter, hasSearchFilter]);

  // ============Top content============
  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button variant="flat" className="capitalize">
                  Status
                  <ChevronDownIcon className="w-4 h-4 ml-2" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={new Set(statusFilter.split(","))}
                selectionMode="multiple"
                onSelectionChange={(keys) => {
                  const selected = Array.from(keys);
                  setStatusFilter(selected.join(","));
                }}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.id} className="capitalize">
                    <span>{status.name}</span>
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
          <div className="flex justify-end">
            <Button>
              <Link href="/admin/user-management/create">Add User</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }, [filterValue, statusFilter, onSearchChange, onClear, statusOptions]);

  return (
    <div className="relative">
      <Table
        aria-label="Recipe table with pagination"
        // heading content
        // topContent={
        //   <div className="flex justify-end">
        //     <Button>
        //       <Link href="/admin/user-management/create">Add User</Link>
        //     </Button>
        //   </div>
        // }
        topContent={topContent}
        bottomContent={
          filteredItems.length > 0 ? (
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="primary"
                page={page}
                total={Math.ceil(filteredItems.length / rowsPerPage)}
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
          items={filteredItems.slice(
            (page - 1) * rowsPerPage,
            page * rowsPerPage
          )}
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
