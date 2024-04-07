import React, { Suspense } from "react";
import { Navigate, Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import { Navbar } from "../../components";
import { IRouteProps } from "../../routes";
import { AnimatePresence } from "framer-motion";
import { useAuthContext } from "./AuthContext";

export type IPublicRoutesWithRedirectProps = Pick<IRouteProps, "onlyLogo">;

const PublicRoutesWithRedirect = ({ onlyLogo }: IPublicRoutesWithRedirectProps) => {
    const location = useLocation();
    const { currentUser, isLoading } = useAuthContext();

    if (isLoading) {
        return <>Loading...</>;
    }

    if (!currentUser) {
        return (
            <React.Fragment>
                <Navbar hideLinks={onlyLogo} />
                <Suspense fallback={<>Loading...</>}>
                    <AnimatePresence mode="wait">
                        <Outlet />
                    </AnimatePresence>
                    <ScrollRestoration />
                </Suspense>
            </React.Fragment>
        );
    } else {
        return <Navigate to={"/dashboard"} state={{ from: location }} replace />;
    }
};

export default PublicRoutesWithRedirect;
