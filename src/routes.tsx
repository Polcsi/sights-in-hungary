import { lazy } from "react";
import { type RouteProps } from "react-router-dom";

// ? Lazy load pages
const Home = lazy(() => import("./pages/home/Home"));
const NotFound = lazy(() => import("./pages/error/NotFound"));

export const publicRoutes: RouteProps[] = [
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/home",
        element: <Home />,
    },
    {
        path: "/*",
        element: <NotFound />,
    },
];

export const privateRoutes: RouteProps[] = [
    {
        path: "/dashboard",
        element: <div>Dashboard</div>,
    },
];
