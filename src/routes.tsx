import { lazy } from "react";
import { type RouteProps } from "react-router-dom";

// ? Lazy load pages
const Home = lazy(() => import("./pages/home/Home"));
const NotFound = lazy(() => import("./pages/error/NotFound"));
const Sights = lazy(() => import("./pages/sights/Sights"));
const Login = lazy(() => import("./features/auth/login/Login"));
const Register = lazy(() => import("./features/auth/register/Register"));

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
        path: "/login",
        element: <Login />,
        onlyLogo: true,
    },
    {
        path: "/register",
        element: <Register />,
        onlyLogo: true,
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
