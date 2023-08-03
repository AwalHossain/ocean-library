import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Wishlist } from "../components/Wishlist";
import AuthenticatedLayout from "../layout/AuthenticatedLayout";
import AddBook from "../pages/AddBook";
import Books from "../pages/Books";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",

                element: (

                    <Home />
                )

            },
            {
                path: "/books", element:
                    <AuthenticatedLayout allowedRoles={['user', 'admin']}>
                        <Books />
                    </AuthenticatedLayout>
            },
            {
                path: "/wishlist", element:
                    <AuthenticatedLayout allowedRoles={['user', 'admin']}>
                        <Wishlist />
                    </AuthenticatedLayout>
            },
            {
                path: "/addbook", element:
                    <AuthenticatedLayout allowedRoles={['user', 'admin']}>
                        <AddBook />
                    </AuthenticatedLayout>
            },
        ]
    },
    {
        path: "/login",
        element: <Login />,
    },
    // {
    //     path: "/books", element:
    //         <AuthenticatedLayout allowedRoles={['user', 'admin']}>
    //             <Books />
    //         </AuthenticatedLayout>
    // },
    {
        path: "/signup",
        element: <Signup />,
    },
    {
        path: "*",
        element: <h1>Not Found</h1>
    }
])



export default router;