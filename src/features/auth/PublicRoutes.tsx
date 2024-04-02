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
                <Outlet />
                <ScrollRestoration />
            </Suspense>
        </React.Fragment>
    );
};

export default PublicRoutes;
