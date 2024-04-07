import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PublicRoutes from "./features/auth/PublicRoutes.tsx";
import { privateRoutes, publicRoutes, publicRoutesWithoutNavLinks, publicRoutesWithRedirect } from "./routes.tsx";
import PrivateRoutes from "./features/auth/PrivateRoutes.tsx";

import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContextProvider } from "./features/auth/AuthContext.tsx";
import PublicRoutesWithRedirect from "./features/auth/PublicRoutesWIthRedirect.tsx";

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
        element: <PublicRoutesWithRedirect onlyLogo />,
        children: publicRoutesWithRedirect,
    },
    {
        path: "/",
        element: <PrivateRoutes />,
        children: privateRoutes,
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <AuthContextProvider>
            <RouterProvider router={router} />
        </AuthContextProvider>
        <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover={false}
            theme="colored"
            transition={Slide}
        />
    </React.StrictMode>
);
