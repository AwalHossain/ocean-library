import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { useAppSelector } from "@/redux/hooks";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Unplug } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Separator } from "../ui/separator";

interface MobileMenuProps {
  filteredNavigation: {
    title: string;
    to?: string;
    items?: { title: string; to?: string; label?: string }[];
  }[];
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function MobileMenu({
  filteredNavigation,
  open,
  setOpen,
}: MobileMenuProps) {
  const { user } = useAppSelector((state) => state.userState);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {/* <Button
          variant="ghost"
          className="mr-4 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <ViewVerticalIcon className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button> */}
      </SheetTrigger>
      <SheetContent side="right" className="p-0 sm:max-w-xs  ">
        <div>
          <Separator className=" mt-16" />
          <div className="flex space-x-2 justify-start items-center  pl-4 pt-2">
            <NavLink
              to="/"
              onClick={() => setOpen(false)}
              className="flex items-center space-x-2"
            >
              {/* <Logo /> */}
              <img
                src={"https://github.com/shadcn.png"}
                alt="logo"
                className="w-10 rounded-full"
              />
            </NavLink>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none text-black">
                {user?.name}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {user?.email}
              </p>
            </div>
          </div>
          <Separator className="mt-2" />
        </div>

        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-8 pl-4 ">
          <div className="flex flex-col h-full ">
            <div className="flex flex-col py-4 space-y-1 ">
              <NavLink to="/" className=" hover:underline cursor-pointer">
                <span>Home</span>
              </NavLink>
              <NavLink to="/" className=" hover:underline cursor-pointer">
                <span>Dashboard</span>
              </NavLink>
              <NavLink to="/" className=" hover:underline cursor-pointer">
                <span>Dashboard</span>
              </NavLink>
            </div>
            <div className="mt-auto">
              <button className=" bg-slate-300 p-2 font-medium rounded hover:underline cursor-pointer flex justify-center items-center space-x-2">
                <Unplug size={14} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
