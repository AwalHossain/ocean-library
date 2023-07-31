import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AuthenticatedLayout from "../layout/AuthenticatedLayout";
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
                path: "/home",

                element: (

                    <Home />
                )

            }
        ]
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/books", element:
            <AuthenticatedLayout allowedRoles={['user', 'admin']}>
                <Books />
            </AuthenticatedLayout>
    },
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