interface NavItem {
  title: string;
  to?: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  label?: string;
  protected?: boolean;
}

interface NavItemWithChildren extends NavItem {
  items?: NavItemWithChildren[];
}

export const mainMenu: NavItemWithChildren[] = [
  {
    title: "Home",
    to: "/",
  },
  {
    title: "My Books",
    to: "/book-shelf",
    protected: true,
  },
  {
    title: "Browse",
    to: "/browse",
  },
  {
    title: "Dashboard",
    to: "/dashboard",
    protected: true,
  },
];

// export cost dashboardMenu =

export const sideMenu: NavItemWithChildren[] = [];
