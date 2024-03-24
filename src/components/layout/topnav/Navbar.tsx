import React from "react";
import Logo from "../Logo";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="w-full sticky top-0 left-0 bg-transparent flex justify-between">
            <section>
                <Logo />
            </section>
            <section>
                <menu>
                    <li>
                        <Link to="">Látnivalók</Link>
                    </li>
                    <li>Kapcsolat</li>
                    <li>Bejelentkezés</li>
                </menu>
            </section>
        </nav>
    );
};

export default Navbar;
