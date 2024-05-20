"use client";

import useMediaQuery from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";
import { ChevronRightCircle } from "lucide-react";
import React from "react";
import { navItems } from "../constant/data";
import DashboardNav from "./DashboardNav";

// interface SidebarProps {
//   isSidebarOpen: boolean;
//   setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
// }

export function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  // const pathname = useLocation().pathname;

  const isSmallScreen = useMediaQuery("(max-width: 1024px)");

  React.useEffect(() => {
    if (isSmallScreen) {
      setIsSidebarOpen(false);
    } else {
      setIsSidebarOpen(true);
    }
  }, [isSmallScreen, setIsSidebarOpen]);

  return (
    <nav
      className={cn(
        `
        ${
          isSidebarOpen ? "w-[200px]" : "w-20"
        } relative h-full bg-slate-400 border-r duration-300 text-black border-gray-400 box-border`
      )}
    >
      <div className="">
        <div>
          <DashboardNav items={navItems} open={isSidebarOpen} />
        </div>
      </div>

      <div className="">
        <ChevronRightCircle
          size={22}
          className={`absolute cursor-pointer -right-5 top-16 w-8 rounded-full duration-300 ${
            !isSidebarOpen && "rotate-180"
          }`}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        />
      </div>
    </nav>
  );
}
