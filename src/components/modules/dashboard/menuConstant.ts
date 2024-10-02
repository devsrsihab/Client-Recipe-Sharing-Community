import {
  CalendarIcon,
  ChartPieIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

// Admin Navigation
export const adminNavigation = [
  { name: "Dashboard", href: "#", icon: HomeIcon, current: true },
  {
    name: "Recipe Management",
    href: "#",
    icon: UsersIcon,
    current: false,
  },
  {
    name: "Content Moderation",
    href: "#",
    icon: FolderIcon,
    current: false,
    children: [
      { name: "Comments", href: "#", icon: UsersIcon, current: false },
    ],
  },
  { name: "Users Management", href: "#", icon: UsersIcon, current: false },
];

// User Navigation
export const userNavigation = [
  { name: "Dashboard", href: "#", icon: HomeIcon, current: true },
  { name: "My Recipes", href: "#", icon: FolderIcon, current: false },
  { name: "Get Membership", href: "#", icon: ChartPieIcon, current: false },
];
