import { lazy } from "react";
import { type RouteProps } from "react-router-dom";

// ? Lazy load pages
const Home = lazy(() => import("./pages/home/Home"));
const NotFound = lazy(() => import("./pages/error/NotFound"));
const Sights = lazy(() => import("./pages/sights/Sights"));

export type IRouteProps = RouteProps & {
    onlyLogo?: boolean;
};

export const publicRoutes: IRouteProps[] = [
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/home",
        element: <Home />,
    },
    {
        path: "/sights",
        element: <Sights />,
    },
    {
        path: "/*",
        element: <NotFound />,
        onlyLogo: true,
    },
];

export const privateRoutes: IRouteProps[] = [
    {
        path: "/dashboard",
        element: <div>Dashboard</div>,
    },
];
