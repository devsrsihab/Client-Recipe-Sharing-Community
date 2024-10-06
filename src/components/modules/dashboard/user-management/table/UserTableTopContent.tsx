// 'use client'

// import { SearchIcon } from "@/src/components/icons";
// import { ChevronDownIcon } from "@heroicons/react/24/outline";
// import { Button } from "@nextui-org/button";
// import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
// import { Input } from "@nextui-org/input";
// import React, { useMemo, useState, useCallback } from "react";

// const topContent = useMemo(() => {
//     const [statusFilter, setStatusFilter] = useState<Selection>();
//   const [filterValue, setFilterValue] = React.useState("");
//   const [page, setPage] = React.useState(1);

//   const onSearchChange = useCallback((value?: string) => {
//     if (value) {
//       setFilterValue(value);
//       setPage(1);
//     } else {
//       setFilterValue("");
//     }
//   }, []);

//     const onClear = React.useCallback(() => {
//       setFilterValue("");
//       setPage(1);
//     }, []);

//   return (
//     <div className="flex flex-col gap-4">
//       <div className="flex justify-between gap-3 items-end">
//         <Input
//           isClearable
//           className="w-full sm:max-w-[44%]"
//           placeholder="Search by name..."
//           startContent={<SearchIcon />}
//           value={filterValue}
//           onClear={() => onClear()}
//           onValueChange={onSearchChange}
//         />
//         <div className="flex gap-3">
//           <Dropdown>
//             <DropdownTrigger className="hidden sm:flex">
//               <Button
//                 endContent={<ChevronDownIcon className="text-small" />}
//                 variant="flat"
//               >
//                 Status
//               </Button>
//             </DropdownTrigger>
//             <DropdownMenu
//               disallowEmptySelection
//               aria-label="Table Columns"
//               closeOnSelect={false}
//               selectedKeys={statusFilter}
//               selectionMode="multiple"
//               onSelectionChange={setStatusFilter}
//             >
//               {statusOptions.map((status) => (
//                 <DropdownItem key={status.uid} className="capitalize">
//                   {capitalize(status.name)}
//                 </DropdownItem>
//               ))}
//             </DropdownMenu>
//           </Dropdown>
//         </div>
//       </div>
//       <div className="flex justify-between items-center">
//         <span className="text-default-400 text-small">
//           Total {users.length} users
//         </span>
//         <label className="flex items-center text-default-400 text-small">
//           Rows per page:
//           <select
//             className="bg-transparent outline-none text-default-400 text-small"
//             onChange={onRowsPerPageChange}
//           >
//             <option value="5">5</option>
//             <option value="10">10</option>
//             <option value="15">15</option>
//           </select>
//         </label>
//       </div>
//     </div>
//   );
// }, [
//   filterValue,
//   statusFilter,
//   visibleColumns,
//   onSearchChange,
//   onRowsPerPageChange,
//   users.length,
//   hasSearchFilter,
// ]);
