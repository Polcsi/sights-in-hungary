import Logo from "../Logo";
import { NavLink, Link } from "react-router-dom";

interface INavbarProps {
    hideLinks?: boolean;
}

const Navbar = ({ hideLinks }: INavbarProps) => {
    return (
        <nav className="w-screen fixed top-0 left-0 bg-transparent flex justify-center z-[100]">
            <div className="flex justify-between w-[var(--page-content-min-width)] max-w-[var(--page-content-max-width)]">
                <section>
                    <Link to="/">
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
