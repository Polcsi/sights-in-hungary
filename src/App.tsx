import { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoutes from "./features/auth/PrivateRoutes";
import { privateRoutes, publicRoutes } from "./routes";
import PublicRoutes from "./features/auth/PublicRoutes";

const App = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Router>
                <Routes>
                    {/* Wrap the PrivateRoutes component with a Route component and pass the element prop to it. */}
                    <Route element={<PrivateRoutes />}>
                        {privateRoutes.map((route) => (
                            <Route key={route.path} {...route} />
                        ))}
                    </Route>

                    {/* Wrap the PublicRoutes component with a Route component and pass the element prop to it. */}
                    <Route element={<PublicRoutes />}>
                        {publicRoutes.map((route) => (
                            <Route key={route.path} {...route} />
                        ))}
                    </Route>
                </Routes>
            </Router>
        </Suspense>
    );
};

export default App;
