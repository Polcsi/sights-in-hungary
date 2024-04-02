import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PublicRoutes from "./features/auth/PublicRoutes.tsx";
import { privateRoutes, publicRoutes, publicRoutesWithoutNavLinks } from "./routes.tsx";
import PrivateRoutes from "./features/auth/PrivateRoutes.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <PublicRoutes />,
        children: publicRoutes,
    },
    {
        path: "/",
        element: <PublicRoutes onlyLogo />,
        children: publicRoutesWithoutNavLinks,
    },
    {
        path: "/",
        element: <PrivateRoutes />,
        children: privateRoutes,
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
