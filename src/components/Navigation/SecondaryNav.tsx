/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

import useScrollListener from "@/hooks/useScrollListener";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Search } from "lucide-react";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import "../Header.css";
import { mainMenu } from "../config/menu";

interface NavProps {
  isSearchOpen: boolean;
  setIsSearchOpen: (value: boolean) => void;
}

export default function SecondaryNav({
  isSearchOpen,
  setIsSearchOpen,
}: NavProps) {
  const [direction, setDirection] = useState("");
  const scroll = useScrollListener();
  const { user } = useAppSelector((state) => state.userState);
  const dispatch = useAppDispatch();
  const [searchInput, setSearchInput] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const handleLogout = () => {
    // dispatch(logout());
  };

  // Filter the navigation links based on the availability of the user

  const filteredNavigation = user
    ? mainMenu
    : mainMenu.filter((item) => !item.protected);

  useEffect(
    () =>
      scroll.y > 150 && scroll.y - scroll.lastY > 0
        ? setDirection("down")
        : setDirection("up"),
    [scroll.y, scroll.lastY]
  );

  const navbar: any = {
    active: {
      visibility: "visible",
      transition: "all 0.5s",
      transform: "translateY(0%)",
    },
    hidden: {
      display: "hidden",
      transition: "all 0.5s",
      transform: "translateY(-200%)",
      opacity: 0,
    },
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSearchOpen(!isSearchOpen);
    setSearchParams({ searchTerm: searchInput });
    navigate(`/browse?searchTerm=${searchInput}`);
    setIsSearchOpen(false);
  };

  const handleCancelSearch = () => {
    setIsSearchOpen(false); // Close the search box
    setSearchInput(""); // Clear the search input
  };

  return (
    <>
      <nav
        className={`flex space-x-3 transition-all duration-500 ease-in-out justify-center border-gray-200 px-5 z-10 navi primary-color supports-backdrop-blur:bg-background/60  w-full border-b bg-background/90 backdrop-blur shadow-md`}
        style={direction === "up" ? navbar.active : navbar.hidden}
      >
        {isSearchOpen ? (
          <div className="relative w-full transition-all duration-500 ease-in-out">
            <div className="flex space-x-4">
              <div className="flex flex-1 justify-center items-center space-x-1 relative">
                <input
                  type="search"
                  placeholder="Search.."
                  className="pl-2 pr-3 py-2 rounded-3xl border-2 border-t-1 border-gray-300 bg-white text-black h-10 text-sm focus:outline-none lg:block w-full"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
                <button
                  className="block h-9 w-12 rounded-r-full border-0 border-l-0 px-4 py-1 bg-gray-400 absolute right-0 top-1/2 transform -translate-y-1/2 md:hidden"
                  type="button"
                  onClick={handleSearch}
                >
                  <Search size={18} />
                </button>
              </div>
              <button
                className="bg-gray-400 p-2 rounded-sm"
                onClick={handleCancelSearch}
              >
                cancel
              </button>
            </div>
          </div>
        ) : (
          filteredNavigation.map((menu, index) => (
            <NavLink
              key={index}
              to={menu.to ?? ""}
              className={({ isActive }) =>
                cn(
                  " text-[1rem]  transition-colors font-normal hover:bg-main hover:text-white py-2 px-4 ",
                  isActive ? "primary-color font-medium" : "secondary-color  "
                )
              }
              style={{
                fontFamily: "Lato, 'Helvetica Neue', 'Helvetica', sans-serif",
              }}
            >
              {menu.title}
            </NavLink>
          ))
        )}
      </nav>
    </>
  );
}
