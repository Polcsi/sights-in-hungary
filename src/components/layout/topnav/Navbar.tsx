import React from "react";
import Logo from "../../Logo";
import { NavLink, Link } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import { useAuthContext } from "../../../features/auth/AuthContext";
import Lottie from "react-lottie";
import addAnimation from "../../../assets/lotties/add_animation.json";

interface INavbarProps {
    hideLinks?: boolean;
}

const Navbar = ({ hideLinks }: INavbarProps) => {
    const navRef = React.useRef<HTMLDivElement>(null);

    const { currentUser } = useAuthContext();

    React.useEffect(() => {
        if (navRef.current) {
            navRef.current.style.backgroundColor = "transparent";
            navRef.current.style.boxShadow = "none";
            navRef.current.style.paddingTop = "5px";
        }
        const handleScroll = () => {
            if (navRef.current) {
                if (window.scrollY > 100) {
                    navRef.current.style.backgroundColor = "white";
                    navRef.current.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.1)";
                    navRef.current.style.paddingTop = "0";
                } else {
                    navRef.current.style.backgroundColor = "transparent";
                    navRef.current.style.boxShadow = "none";
                    navRef.current.style.paddingTop = "5px";
                }
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <nav
            ref={navRef}
            style={{
                background: "transparent",
                boxShadow: "none",
                paddingTop: "5px",
            }}
            className="w-screen fixed top-0 left-0 flex justify-center z-[100] transition-all duration-200 ease-in-out"
        >
            <div className="flex justify-between w-[var(--page-content-min-width)] max-w-[var(--page-content-max-width)]">
                <section>
                    <Link to="/" preventScrollReset={false}>
                        <Logo />
                    </Link>
                </section>
                <section className="flex items-center">
                    {!hideLinks ? (
                        <menu className="flex gap-4 items-center font-medium">
                            <li>
                                <menu className="flex gap-10">
                                    <li>
                                        <NavLink
                                            className={({ isActive }) => {
                                                return isActive ? "active-link" : "";
                                            }}
                                            to="/sights"
                                        >
                                            Látnivalók
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            className={({ isActive }) => {
                                                return isActive ? "active-link" : "";
                                            }}
                                            to="/contact"
                                        >
                                            Kapcsolat
                                        </NavLink>
                                    </li>
                                    {currentUser ? (
                                        <li>
                                            <NavLink
                                                className={({ isActive }) => {
                                                    return isActive ? "active-link" : "";
                                                }}
                                                to="/dashboard"
                                            >
                                                Dashboard
                                            </NavLink>
                                        </li>
                                    ) : (
                                        <React.Fragment>
                                            <li>
                                                <NavLink
                                                    className={({ isActive }) => {
                                                        return isActive ? "active-link" : "";
                                                    }}
                                                    to="/login"
                                                >
                                                    Bejelentkezés
                                                </NavLink>
                                            </li>
                                        </React.Fragment>
                                    )}
                                </menu>
                            </li>
                            {currentUser ? (
                                <React.Fragment>
                                    <li>
                                        <div className="w-[2px] h-[30px] bg-gray-primary" />
                                    </li>
                                    <li>
                                        <menu className="flex gap-1">
                                            <li>
                                                <Link to="/add-sight">
                                                    <Lottie
                                                        height={40}
                                                        width={40}
                                                        options={{
                                                            animationData: addAnimation,
                                                            rendererSettings: {
                                                                preserveAspectRatio: "xMidYMid slice",
                                                                progressiveLoad: true,
                                                            },
                                                        }}
                                                    />
                                                </Link>
                                            </li>
                                            <li>
                                                <ProfileMenu />
                                            </li>
                                        </menu>
                                    </li>
                                </React.Fragment>
                            ) : null}
                        </menu>
                    ) : null}
                </section>
            </div>
        </nav>
    );
};

export default Navbar;
