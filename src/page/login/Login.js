import React, {Component} from 'react';
import database from '../../utils/Database';
import * as Translation from "../../utils/Translation";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from "react-bootstrap/Button";
import '../../index'
import NavBar from "../../utils/NavBar";
import {bindActionCreators} from "redux";
import {connect} from "react-redux"
import {SING_IN, SING_OUT} from '../../actions'

class Login extends Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            email: '',
            password: '',
            emailError: '',
            passwordError: '',
            error: '',
            hideAlert: true,
        };
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    removeErrors() {
        this.setState({
            emailError: '',
            passwordError: '',
            error: '',
            hideAlert: true
        });
    }

    async login(e) {
        this.removeErrors();

        e.preventDefault();

        if (this.state.email === '' && this.state.password === '') {
            this.setState({
                error: Translation.EMPLOYEE_LOGIN_AND_PASSWORD_ERROR,
                hideAlert: false
            });
            return;
        }

        if (this.state.password === '') {
            this.setState({
                passwordError: Translation.EMPLOYEE_LOGIN_PASSWORD_ERROR,
                hideAlert: false
            });
            return;
        }

        if (this.state.email === '') {
            this.setState({
                emailError: Translation.EMPLOYEE_LOGIN_EMAIL_ERROR,
                hideAlert: false
            });
            return;
        }


        await database.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((data) => {

            this.props.SING_IN();
            const authUser = database.auth().currentUser;
            localStorage.setItem("isAuth", true);
            localStorage.setItem("authUser", JSON.stringify(authUser));
        }).catch((error) => {
            this.setState({
                error: Translation.EMPLOYEE_LOGINING_BASIC_ERROR,
                hideAlert: false
            });
        });

    }

    render() {
        return (
            <>
                <div>
                    <NavBar/>
                    <div className="text-center">
                        <h3>{Translation.EMPLOYEE_LOGIN_LABEL}</h3>

                        <br/>
                        <br/>
                        <br/>
                        <div className="w-25 d-inline-block">
                            <div className="h5 text-center text-black alert alert-danger"
                                 hidden={this.state.hideAlert}>{this.state.emailError || this.state.passwordError || this.state.error}</div>
                            <div className="col">
                                <input className="form-control" value={this.state.email}
                                       onChange={this.handleChange}
                                       type="text" name="email"
                                       placeholder={Translation.EMPLOYEE_LOGIN_USERNAME_PLACEHOLDER}/>
                            </div>
                            <br/>
                            <div className="col">
                                <input className="form-control" value={this.state.password}
                                       onChange={this.handleChange}
                                       type="password" name="password"
                                       placeholder={Translation.EMPLOYEE_LOGIN_PASSWORD_PLACEHOLDER}/>
                            </div>
                            <br/>
                            <div className="col">
                                <Button onClick={this.login} variant="dark" bssize="lg"
                                        block>{Translation.EMPLOYEE_LOGIN_BUTTON}</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

function mapStateToProps(state) {
    return {
        isLogged: state.isLogged
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        SING_IN: SING_IN,
        SING_OUT: SING_OUT
    }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Login);
