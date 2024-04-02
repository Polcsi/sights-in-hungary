import React, { Suspense } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { Navbar } from "../../components";
import { IRouteProps } from "../../routes";
import { AnimatePresence } from "framer-motion";

export type IPublicRoutesProps = Pick<IRouteProps, "onlyLogo">;

const PublicRoutes = ({ onlyLogo }: IPublicRoutesProps) => {
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
};

export default PublicRoutes;
