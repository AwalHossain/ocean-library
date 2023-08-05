

import { Disclosure } from "@headlessui/react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { logout } from "../redux/feature/auth/userSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import SharedUserMenu from "./ShareMenus";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";

const Navbar = () => {
  const { user } = useAppSelector(state => state.userState)
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const navigation: { [key: string]: string } = {
    "Home": "/",
    "Books": "/books",
    "wishlist": "/wishlist",
    "readinglist": "/readinglist",
    "Addbook": "/addBook",
  }

  // Filter the navigation links based on the availability of the user
  const filteredNavigation = user
    ? navigation
    : Object.fromEntries(Object.entries(navigation).filter(([key]) => key !== "wishlist" && key !== "readinglist" && key !== "Addbook"));




  return (
    <div className="w-full bg-slate-600">
      <nav className="container relative flex flex-wrap items-center justify-between p-8 mx-auto lg:justify-between xl:px-0">
        {/* Logo  */}
        <Disclosure>
          {({ open }) => (
            <>
              <div className="flex flex-wrap items-center justify-between w-full lg:w-auto">
                <a href="/">
                  <span className="flex items-center space-x-2 text-2xl font-medium text-indigo-500 dark:text-gray-100">
                    <span>
                      {/* <img
                        src="/img/logo.svg"
                        alt="N"
                        width="32"
                        height="32"
                        className="w-8"
                      /> */}
                    </span>
                    <span>Bookly</span>
                  </span>
                </a>

                <Disclosure.Button
                  aria-label="Toggle Menu"
                  className="px-2 py-1 ml-auto text-gray-500 rounded-md lg:hidden hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 focus:outline-none dark:text-gray-300 dark:focus:bg-trueGray-700">
                  <svg
                    className="w-6 h-6 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24">
                    {open && (
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                      />
                    )}
                    {!open && (
                      <path
                        fillRule="evenodd"
                        d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                      />
                    )}
                  </svg>
                </Disclosure.Button>

                <Disclosure.Panel className="flex flex-wrap w-full my-5 lg:hidden">
                  <>
                    {
                      Object.entries(filteredNavigation).map(([key, value]) => (
                        <Link key={key} to={value} className="w-full px-4 py-2 -ml-4 text-gray-500 rounded-md dark:text-gray-300 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 dark:focus:bg-gray-800 focus:outline-none">
                          {key}
                        </Link>
                      ))
                    }
                    <li className="ml-5">
                      <DropdownMenu>
                        <DropdownMenuTrigger className="outline-none">
                          <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuLabel>Account</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="cursor-pointer">
                            <Link onClick={handleLogout} to="/Login">
                              Logout
                            </Link>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </li>
                  </>
                </Disclosure.Panel>
              </div>
            </>
          )}
        </Disclosure>

        {/* menu  */}

        <SharedUserMenu user={user} navigation={navigation} />
        {/* /* <ThemeChanger /> */}

      </nav>
    </div>
  );
}

export default Navbar;