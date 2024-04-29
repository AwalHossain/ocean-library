import AuthLayout from "@/layout/AuthLayout";
import BookShelf from "@/pages/BookShelf";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import UpdateBook from "../components/UpdateBook";
import AuthenticatedLayout from "../layout/AuthenticatedLayout";
import AddBook from "../pages/AddBook";
import BrowseBook from "../pages/BrowseBook";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ReadlingList from "../pages/ReadingList";
import Signup from "../pages/Signup";
import SingleBook from "../pages/SingleBook";
import { Wishlist } from "../pages/Wishlist";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/browse",
        element: <BrowseBook />,
      },
      {
        path: "/book-details/:id",
        element: <SingleBook />,
      },
      {
        path: "/update-book/:bookId",
        element: <UpdateBook />,
      },
      {
        path: "/book-shelf",
        element: <BookShelf />,
      },
      {
        path: "/wishlist",
        element: (
          <AuthenticatedLayout allowedRoles={["user", "admin"]}>
            <Wishlist />
          </AuthenticatedLayout>
        ),
      },
      {
        path: "/readinglist",
        element: (
          <AuthenticatedLayout allowedRoles={["user", "admin"]}>
            <ReadlingList />
          </AuthenticatedLayout>
        ),
      },
      {
        path: "/addbook",
        element: (
          <AuthenticatedLayout allowedRoles={["user", "admin"]}>
            <AddBook />
          </AuthenticatedLayout>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: (
      <AuthLayout>
        <Login />
      </AuthLayout>
    ),
  },
  {
    path: "/register",
    element: (
      <AuthLayout>
        <Signup />
      </AuthLayout>
    ),
  },
  {
    path: "*",
    element: <h1>Not Found</h1>,
  },
]);

export default router;
