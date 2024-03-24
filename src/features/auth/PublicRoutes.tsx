import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../../components";
import { IRouteProps } from "../../routes";

export type IPublicRoutesProps = Pick<IRouteProps, "onlyLogo">;

const PublicRoutes = ({ onlyLogo }: IPublicRoutesProps) => {
    return (
        <React.Fragment>
            <Navbar hideLinks={onlyLogo} />
            <Outlet />
        </React.Fragment>
    );
};

export default PublicRoutes;
