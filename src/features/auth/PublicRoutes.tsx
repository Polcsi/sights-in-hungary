import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../../components";

const PublicRoutes = () => {
    return (
        <React.Fragment>
            <Navbar />
            <Outlet />
        </React.Fragment>
    );
};

export default PublicRoutes;
