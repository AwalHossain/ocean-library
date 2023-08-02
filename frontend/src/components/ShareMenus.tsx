// SharedUserMenu.js
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { logout } from "../redux/feature/auth/userSlice";
import { useAppDispatch } from "../redux/hooks";
import { IUser } from "../types";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";

interface INavigation {
  [key: string]: string;
}

interface ISharedUserMenu {
  user: IUser | null;
  navigation: INavigation
}



const SharedUserMenu = ({ user, navigation }: ISharedUserMenu) => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };


  // Filter the navigation links based on the availability of the user
  const filteredNavigation = user
    ? navigation
    : Object.fromEntries(Object.entries(navigation).filter(([key]) => key !== "wishlist" && key !== "readingList" && key !== "finishedBooks"));


  return (
<div>
  <div className="hidden mr-3 space-x-4 lg:flex nav__item items-center">
    <div className="hidden text-center lg:flex lg:items-center">
      <ul className="flex items-center justify-end flex-1 pt-6 list-none lg:pt-0 lg:flex">
        {/* Your navigation links */}
        {Object.entries(filteredNavigation).map(([key, value]) => (
          <Link
            key={key}
            to={value}
            className="w-full px-4 py-2 -ml-4 text-gray-500 rounded-md dark:text-gray-300 hover:text-indigo-500 focus:text-indigo-500 focus:bg-indigo-100 dark:focus:bg-gray-800 focus:outline-none"
          >
            {key}
          </Link>
        ))}
      </ul>
    </div>
    {/* Centered list item with the Avatar */}
    <li className="ml-5 flex items-center">
      {user?.email ? (
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-blue-500 bg-gray-200 rounded-full p-1">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-slate-600">
            <DropdownMenuLabel>Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <Link onClick={handleLogout} to="/Login">
                Logout
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link to="/Login">Login</Link>
      )}
    </li>
  </div>
</div>

  );
};

export default SharedUserMenu;
