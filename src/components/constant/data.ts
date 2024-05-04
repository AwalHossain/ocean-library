import { Icons } from "../dashboard/Icons";

export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
}

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard/", // Updated
    icon: "dashboard",
    label: "Dashboard",
  },
  {
    title: "Book Shelf lddoe p",
    href: "/dashboard/shelf", // Updated
    icon: "book",
    label: "Book Shelf",
  },
];
