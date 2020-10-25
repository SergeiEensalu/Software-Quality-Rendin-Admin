import React from "react";
import {NavLink} from "react-router-dom";
import { BrowserRouter as Router } from 'react-router-dom';

const Header = () => {
    return (
        <Router>
        <nav className="main-nav">
            <ul>
                <li><NavLink to="/payment">Payment</NavLink></li>
                <li><NavLink to="/settings">Settings</NavLink></li>
            </ul>
        </nav> </Router>   );
};

export default Header;
