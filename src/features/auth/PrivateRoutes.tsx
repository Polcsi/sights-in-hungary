import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoutes = () => {
    const location = useLocation();

    return false ? <Outlet /> : <Navigate to="/" state={{ from: location }} replace />;
};

export default PrivateRoutes;
