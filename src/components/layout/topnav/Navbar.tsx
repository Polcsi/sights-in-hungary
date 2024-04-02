import React from "react";
import Logo from "../Logo";
import { NavLink, Link } from "react-router-dom";

interface INavbarProps {
    hideLinks?: boolean;
}

const Navbar = ({ hideLinks }: INavbarProps) => {
    const navRef = React.useRef<HTMLDivElement>(null);

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
                        <menu className="flex gap-10 items-center font-medium">
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
                        </menu>
                    ) : null}
                </section>
            </div>
        </nav>
    );
};

export default Navbar;
