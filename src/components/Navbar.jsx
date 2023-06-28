import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="header__nav">
            <ul className="nav__list">
                <li className="nav__item"><Link className="nav__link" to="/">Characters</Link></li>
                <li className="nav__item"><Link className="nav__link" to="/locations">Locations</Link></li>
                <li className="nav__item"><Link className="nav__link" to="/episodes">Episodes</Link></li>
            </ul>
        </nav>
    )
}

export default Navbar;