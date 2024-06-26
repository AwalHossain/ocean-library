// Define global if it doesn't exist
if (typeof global === "undefined") {
  window.global = window;
}

import React from "react";
import ReactDOM from "react-dom/client";

import "react-quill/dist/quill.snow.css";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import AuthMiddleware from "./helpers/AuthMiddleware";
import "./index.css";
import store from "./redux/store";
import router from "./router/routes";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthMiddleware>
        <RouterProvider router={router} />
      </AuthMiddleware>
    </Provider>
  </React.StrictMode>
);
