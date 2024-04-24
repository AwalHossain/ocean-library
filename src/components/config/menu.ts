interface NavItem {
  title: string;
  to?: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  label?: string;
}

interface NavItemWithChildren extends NavItem {
  items?: NavItemWithChildren[];
}

export const mainMenu: NavItemWithChildren[] = [
  {
    title: "Home",
    to: "",
  },
  {
    title: "My Books",
    // items: [
    //   {
    //     title: "Sample",
    //     to: "/sample",
    //   },
    //   {
    //     title: "Sample Dua",
    //     to: "/#",
    //   },
    // ],
    to: "",
  },
  {
    title: "Browse",
    to: "empty",
  },
  {
    title: "Dashboard",
    to: "empty",
  },
];

export const sideMenu: NavItemWithChildren[] = [];
