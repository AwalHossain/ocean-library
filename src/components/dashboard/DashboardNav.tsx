import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { NavItem } from "../constant/data";
import { Icons } from "./Icons";

interface DashboardNavProps {
  items: NavItem[];
  open: boolean;
}

export default function DashboardNav({ items, open }: DashboardNavProps) {
  const path = useLocation().pathname;
  return (
    <nav
      className={`grid items-start gap-2 px-[0.5rem] pt-20 
    ${open ? "w-[200px]" : "w-20 "}`}
    >
      {items.map((item) => {
        const Icon = Icons[item.icon as keyof typeof Icons];
        return (
          item.href && (
            <Link key={item.title} to={item.href} onClick={() => !open}>
              <span
                className={cn(
                  "group flex items-center px-3 py-2 space-x-2 rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  path === item.href ? "bg-accent" : "transparent",
                  open ? "justify-start" : "justify-center"
                )}
              >
                {/* <span className="text-lg">{item.icon}</span> */}
                <Icon
                  className={`${
                    open ? "text-[16px]" : "text-[20px]"
                  } origin-left duration-500 h-4 w-4 `}
                />
                <span
                  className={`${
                    !open && "hidden"
                  } origin-left duration-800 text-[12px]`}
                >
                  {item.title}
                </span>
              </span>
            </Link>
          )
        );
      })}
    </nav>
  );
}
