import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Books from "../pages/Books";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/books", element: <Books/> },
        ]
    },
    {
        path: "/login",
        element: <Login />,
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