import { lazy } from "react";
import { type RouteObject, type RouteProps } from "react-router-dom";

// ? Lazy load pages
const Home = lazy(() => import("./pages/home/Home"));
const NotFound = lazy(() => import("./pages/error/NotFound"));
const Sights = lazy(() => import("./pages/sights/Sights"));
const Login = lazy(() => import("./features/auth/login/Login"));
const Register = lazy(() => import("./features/auth/register/Register"));
const Contact = lazy(() => import("./pages/contact/Contact"));
const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));
const Me = lazy(() => import("./pages/me/Me"));
const SightCreation = lazy(() => import("./pages/sights/create/SightCreation"));

export type IRouteProps = RouteProps & {
    onlyLogo?: boolean;
};

export const publicRoutes: RouteObject[] = [
    {
        index: true,
        element: <Home />,
    },
    {
        path: "home",
        element: <Home />,
    },
    {
        path: "sights",
        element: <Sights />,
    },
    {
        path: "contact",
        element: <Contact />,
    },
];

export const publicRoutesWithoutNavLinks: RouteObject[] = [
    {
        path: "*",
        element: <NotFound />,
    },
];

export const publicRoutesWithRedirect: RouteObject[] = [
    {
        path: "login",
        element: <Login />,
    },
    {
        path: "register",
        element: <Register />,
    },
];

export const privateRoutes: RouteObject[] = [
    {
        path: "dashboard",
        element: <Dashboard />,
    },
    {
        path: "me",
        element: <Me />,
    },
    {
        path: "sights/create",
        element: <SightCreation />,
    },
];
