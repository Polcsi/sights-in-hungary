import React, { Suspense } from "react";
import { Navigate, Outlet, ScrollRestoration, useLocation } from "react-router-dom";

import { Navbar } from "../../components";
import { useAuthContext } from "./AuthContext";

const PrivateRoutes = () => {
    const location = useLocation();
    const { currentUser, isLoading } = useAuthContext();

    if (isLoading) {
        return <>Loading...</>;
    }

    if (currentUser) {
        return (
            <React.Fragment>
                <Navbar />
                <Suspense fallback={<>Loading...</>}>
                    <Outlet />
                    <ScrollRestoration />
                </Suspense>
            </React.Fragment>
        );
    } else {
        return <Navigate to="/" state={{ from: location }} replace />;
    }
};

export default PrivateRoutes;
