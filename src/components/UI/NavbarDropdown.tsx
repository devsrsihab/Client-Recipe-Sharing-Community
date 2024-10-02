"use client";

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Avatar } from "@nextui-org/avatar";
import { usePathname, useRouter } from "next/navigation";
import { logOutUser } from "@/src/services/AuthService";
import { useUser } from "@/src/context/user.provider";
import { protectedRoutes } from "@/src/constant";

const NavbarDropdown = () => {
  const router = useRouter();
  const { setIsLoading: userLoading } = useUser();
  const pathName = usePathname();

  // hanlde navigation
  const handleNavigation = (path: string) => router.push(path);

  // hanlde logout
  const handleUserLogout = () => {
    logOutUser();
    userLoading(true);
    if (protectedRoutes.some((route) => pathName.match(route))) {
      router.push("/");
    }
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Avatar className="cursor-pointer" name="Sohan" />
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem onClick={() => handleNavigation("/admin/dashboard")}>
          Admin Dashboard
        </DropdownItem>
        <DropdownItem onClick={() => handleNavigation("/user/dashboard")}>
          User Dashboard
        </DropdownItem>
        <DropdownItem
          onClick={() => handleNavigation("/profile/claim-requests")}
        >
          Claim Request
        </DropdownItem>
        <DropdownItem onClick={() => handleNavigation("/profile/create-post")}>
          Create Post
        </DropdownItem>
        <DropdownItem onClick={() => handleNavigation("/settings")}>
          Settings
        </DropdownItem>
        <DropdownItem
          onClick={() => handleUserLogout()}
          className="text-danger"
          color="danger"
        >
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default NavbarDropdown;
