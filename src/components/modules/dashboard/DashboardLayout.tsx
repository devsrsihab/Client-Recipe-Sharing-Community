"use client";

import SidebarMenu from "@/src/components/modules/dashboard/SidebarMenu";
import { useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import {
  adminNavigation,
  userNavigation,
  userTest,
} from "@/src/components/modules/dashboard/menuConstant";
import Link from "next/link";
import { ThemeSwitch } from "../../theme-switch";
import { logOutUser } from "@/src/services/AuthService";

const avaterDropdownMenu = [
  {
    name: "Your profile",
    href: userTest?.role === "admin" ? "/admin/profile" : "/user/profile",
  },
  { name: "Sign out", href: "#" },
];

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <SidebarMenu
        navigation={
          userTest?.role === "admin" ? adminNavigation : userNavigation
        }
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/*3. Main Content with Header */}
      <div className="lg:pl-72">
        {/* Header */}
        <div className="dark:bg-[#111827] sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200  px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>

          {/* Separator */}
          <div
            aria-hidden="true"
            className="h-6 w-px bg-gray-900/10 lg:hidden"
          />

          <div className="flex flex-1 gap-x-4 justify-end lg:gap-x-6">
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              {/* Separator */}
              <div
                aria-hidden="true"
                className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10"
              />

              {/* Profile dropdown */}
              <div className="flex items-center gap-x-4 lg:gap-x-6">
                <ThemeSwitch />
                <Menu as="div" className="relative">
                  <MenuButton className="-m-1.5 flex gap-5 items-center p-1.5">
                    <span className="sr-only">Open user menu</span>
                    <img
                      alt=""
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      className="h-8 w-8 rounded-full bg-gray-50"
                    />
                    <span className="hidden lg:flex lg:items-center">
                      <span
                        aria-hidden="true"
                        className="ml-4 text-sm font-semibold leading-6 text-gray-900 dark:text-white"
                      >
                        Tom Cook
                      </span>
                      <ChevronDownIcon
                        aria-hidden="true"
                        className="ml-2 h-5 w-5 text-gray-400"
                      />
                    </span>
                  </MenuButton>
                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                  >
                    <MenuItem key="/">
                      <Link
                        href="/"
                        className="cursor-pointer block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50"
                      >
                        Profile
                      </Link>
                    </MenuItem>
                    <MenuItem key="logout">
                      <a
                        onClick={() => {
                          logOutUser();
                        }}
                        className="cursor-pointer block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50"
                      >
                        Logout
                      </a>
                    </MenuItem>
                  </MenuItems>
                </Menu>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </>
  );
};

export default DashboardLayout;
