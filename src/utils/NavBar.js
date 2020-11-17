import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import React from "react";
import logo from "./pictures/rendin_logo.png";
import database from "./Database";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux"
import {SING_OUT} from '../actions'


function NavBar() {

    const isAuth = useSelector(state => state.isLogged);
    const dispatch = useDispatch();

    let history = useHistory();

    function logout() {
        database.auth().signOut().then(r => {
                dispatch(SING_OUT());
                localStorage.setItem("isAuth", false);
                localStorage.setItem("authUser", null);

            }
        );
    }

    function login() {
        history.push("/");
    }

    return (
        <div>
            <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
                <Navbar.Brand>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>

                <Nav className="mr-auto text-white">
                </Nav>
                {(isAuth) ?
                    <Nav>
                        <Nav.Link>
                            <strong className="h5 text-white" onClick={logout}>Logout</strong>
                        </Nav.Link>
                    </Nav>
                    :
                    <Nav>
                        <Nav.Link>
                            <span className="h5 text-white" onClick={login}>Login</span>
                        </Nav.Link>
                    </Nav>
                }
            </Navbar>
            <br/>
            <br/>
            <div className="text-center">
                <img href="/profile" src={logo} alt="Logo"/>
            </div>
        </div>
    )
}

export default NavBar
