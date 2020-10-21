import React from "react";
import {NavLink} from "react-router-dom";

const Header = () => {
    return (
        <nav className="main-nav">
            <ul>
                <li><NavLink to="/payment">Payment</NavLink></li>
                <li><NavLink to="/settings">Settings</NavLink></li>
            </ul>
        </nav>    );
};

export default Header;
