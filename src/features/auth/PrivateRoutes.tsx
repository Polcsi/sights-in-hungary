import { Suspense } from "react";
import { Navigate, Outlet, ScrollRestoration, useLocation } from "react-router-dom";

const PrivateRoutes = () => {
    const location = useLocation();

    return false ? (
        <Suspense fallback={<>Loading...</>}>
            <Outlet />
            <ScrollRestoration />
        </Suspense>
    ) : (
        <Navigate to="/" state={{ from: location }} replace />
    );
};

export default PrivateRoutes;
