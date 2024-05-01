import { AnimatePresence } from "framer-motion";
import React, { Suspense } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { Navbar } from "../../components";
import { IRouteProps } from "../../routes";

export type IPublicRoutesProps = Pick<IRouteProps, "onlyLogo">;

const PublicRoutes = ({ onlyLogo }: IPublicRoutesProps) => {
    return (
        <React.Fragment>
            <Navbar hideLinks={onlyLogo} />
            <Suspense fallback={<>Loading...</>}>
                <AnimatePresence mode="wait">
                    <Outlet />
                </AnimatePresence>
                <ScrollRestoration
                    getKey={(location) => {
                        const paths = ["/sights"];
                        return paths.includes(location.pathname)
                            ? // home and notifications restore by pathname
                              location.pathname
                            : // everything else by location like the browser
                              location.key;
                    }}
                />
            </Suspense>
        </React.Fragment>
    );
};

export default PublicRoutes;
