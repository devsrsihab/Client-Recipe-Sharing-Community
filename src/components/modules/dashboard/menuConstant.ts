import {
  ChartPieIcon,
  FolderIcon,
  HomeIcon,
  CakeIcon,
  UsersIcon,
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";

export const userTest = {
  name: "Tom Cook",
  role: "admin",
};

// Admin Navigation
export const adminNavigation = [
  {
    name: "Dashboard",
    href: "/admin/dashboard",
    icon: HomeIcon,
    current: false,
  },
  {
    name: "Recipe Management",
    href: "/admin/recipe-managment",
    icon: CakeIcon,
    current: false,
  },
  {
    name: "Content Moderation",
    href: "",
    icon: DocumentTextIcon,
    current: false,
    children: [
      {
        name: "Comments",
        href: "/admin/comments-managment",
        icon: ChatBubbleLeftRightIcon,
        current: false,
      },
    ],
  },
  {
    name: "Users Management",
    href: "/admin/user-management",
    icon: UsersIcon,
    current: false,
  },
];

// User Navigation
export const userNavigation = [
  { name: "Dashboard", href: "/user/dashboard", icon: HomeIcon, current: true },
  {
    name: "My Recipes",
    href: "/user/recipe-managment",
    icon: FolderIcon,
    current: false,
  },
  {
    name: "Get Membership",
    href: "/user/membership",
    icon: ChartPieIcon,
    current: false,
  },
];
