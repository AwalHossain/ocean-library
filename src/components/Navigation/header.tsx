import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { useState } from "react";
import {
  NavLink,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
// import { Logo } from "../logo";
import logo from "@/assets/logo.png";
import { logout } from "@/redux/feature/auth/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Search } from "lucide-react";
import { mainMenu } from "../config/menu";
import MobileMenu from "./MobileMenu";
import SecondaryNav from "./SecondaryNav";

export function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { user } = useAppSelector((state) => state.userState);
  const dispatch = useAppDispatch();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
  };

  // Filter the navigation links based on the availability of the user

  const filteredNavigation = user
    ? mainMenu
    : mainMenu.filter((item) => !item.protected);

  const handeDashboard = () => {
    // navigate("/dashboard");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ searchTerm: searchInput });
    navigate(`/browse?searchTerm=${searchInput}`);
    setIsSearchOpen(false);
  };

  return (
    <header style={{}} className="sticky top-0 z-50">
      <div className="primary-color py-2 supports-backdrop-blur:bg-background/60  w-full border-b bg-background/90 backdrop-blur">
        <div className="container px-4 md:px-8 flex h-10 justify-between items-center space-x-4">
          <div className="hidden md:block">
            <NavLink to="/" className=" flex items-center space-x-2 w-32">
              <img src={logo} alt="Logo" />
            </NavLink>
          </div>

          {/* middle */}
          <div className="md:flex md:flex-1 md:w-full md:max-w-md md:pr-16">
            <form className="relative md:w-full" onSubmit={handleSearch}>
              <input
                type="search"
                name=""
                id=""
                placeholder="Search Books"
                onSubmit={handleSearch}
                className={`pl-10 pr-3 py-1 md:w-full border-2 hidden border-gray-300 bg-white h-10 rounded-3xl text-sm focus:outline-none md:block`}
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 hidden md:block">
                <Search size={18} />
              </div>
              <button
                className="block md:hidden w-12"
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsSearchOpen(!isSearchOpen);
                }}
              >
                <Search size={18} />
              </button>
            </form>
          </div>
          {/* mobile */}

          <MobileMenu
            filteredNavigation={filteredNavigation}
            open={open}
            setOpen={setOpen}
          />
          <a href="/" className="mr-6 flex items-center space-x-2 md:hidden">
            {/* <Icons.logo className="h-6 w-6" /> */}
            {/* <span className="font-bold inline-block">little</span> */}
            <img src={logo} alt="logo" className="w-40" />
          </a>
          {/* right */}
          <div className="flex items-center justify-between space-x-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              {/* <CommandMenu /> */}
            </div>

            <nav className="flex items-center space-x-1">
              {user ? (
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                  onClick={() => setOpen(!open)}
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                </Button>
              ) : (
                <NavLink
                  to="/login"
                  className="text-sm font-medium primary-color bg-main text-white rounded-[25px] py-2 px-7"
                >
                  Login
                </NavLink>
              )}
            </nav>
          </div>
        </div>
      </div>
      <SecondaryNav
        isSearchOpen={isSearchOpen}
        setIsSearchOpen={setIsSearchOpen}
      />
    </header>
  );
}
