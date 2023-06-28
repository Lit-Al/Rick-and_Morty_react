import React from "react";
import Navbar from "./Navbar.jsx";
import logo from "../img/logo.png";

const Header = () => {
    return (
        <header className="header">
            <div className="container">
                <img className="logo" src={logo} alt="Logo" />
                <Navbar />
            </div>
        </header>
    )
}

export default Header;