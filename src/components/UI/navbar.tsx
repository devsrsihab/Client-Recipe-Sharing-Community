"use client";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Skeleton } from "@nextui-org/skeleton";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";

import { siteConfig } from "@/src/config/site";
import { ThemeSwitch } from "@/src/components/theme-switch";
import { Logo } from "@/src/components/icons";
import NavbarDropdown from "./NavbarDropdown";
import { useUser } from "@/src/context/user.provider";
import Link from "next/link";

export const Navbar = () => {
  const { user, isLoading: userLoading } = useUser();

  // filtered navitems
  const filteredNavItems = user?.email
    ? siteConfig.navItems.filter(
        (item) => item.href !== "/auth/register" && item.href !== "/auth/login"
      )
    : siteConfig.navItems;

  // filtered navMenuItems
  const filteredNavMenuItems = user?.email
    ? siteConfig.navMenuItems.filter(
        (item) => item.href !== "/auth/login" && item.href !== "/auth/register"
      )
    : siteConfig.navMenuItems;

  const renderNavItems = () => {
    if (userLoading) {
      return (
        <>
          <Skeleton className="w-20 h-8 rounded-lg" />
          <Skeleton className="w-20 h-8 rounded-lg" />
          <Skeleton className="w-20 h-8 rounded-lg" />
        </>
      );
    }

    return filteredNavItems.map((item) => (
      <NavbarItem key={item.href}>
        <NextLink
          className={clsx(
            linkStyles({ color: "foreground" }),
            "data-[active=true]:text-primary data-[active=true]:font-medium"
          )}
          color="foreground"
          href={item.href}
        >
          {item.label}
        </NextLink>
      </NavbarItem>
    ));
  };

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full z-20" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {renderNavItems()}
        </ul>
      </NavbarContent>

      {/* Desktop */}
      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex">
          <ThemeSwitch />
        </NavbarItem>

        {userLoading ? (
          <NavbarItem className="hidden sm:flex">
            <Skeleton className="w-24 h-10 rounded-lg" />
          </NavbarItem>
        ) : user?.email ? (
          <NavbarItem className="hidden sm:flex">
            <NavbarDropdown />
          </NavbarItem>
        ) : (
          <Link href="/auth/login">Login</Link>
        )}
      </NavbarContent>

      {/* Mobile */}
      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        {userLoading ? (
          <Skeleton className="w-10 h-10 rounded-lg" />
        ) : (
          <NavbarMenuToggle />
        )}
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {userLoading
            ? Array(5)
                .fill(0)
                .map((_, index) => (
                  <Skeleton
                    key={index}
                    className="w-full h-10 rounded-lg mb-2"
                  />
                ))
            : filteredNavMenuItems.map((item, index) => (
                <NavbarMenuItem key={`${item}-${index}`}>
                  <NextLink
                    color={
                      index === 2
                        ? "primary"
                        : index === siteConfig.navMenuItems.length - 1
                          ? "danger"
                          : "foreground"
                    }
                    href={item.href}
                  >
                    {item.label}
                  </NextLink>
                </NavbarMenuItem>
              ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
