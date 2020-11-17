import React, {Component} from 'react';
import database from './utils/Database';
import Admin from './page/profile/Admin';
import Login from './page/login/Login';
import ProtectedRoute from "./utils/routers/ProtectedRoute";
import PublicRoute from "./utils/routers/PublicRoute";
import {BrowserRouter as Router, Switch} from "react-router-dom";
import Agreement from "./page/agreement/Agreement";
import {connect} from "react-redux";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            authenticated: false,
            currentUser: null
        });
        this.authListener = this.authListener.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        this.authListener();
    }

    authListener() {
        database.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    authenticated: true,
                    currentUser: user
                });
            } else {
                this.setState({
                    authenticated: false,
                    currentUser: null
                });
            }
        });
    }


    render() {
        return (
            <Router>
                <Switch>
                    <PublicRoute path="/" exact={true} component={Login} authenticated={this.props.isLogged}/>
                    <ProtectedRoute path="/profile" exact={true} component={Admin}
                                    authenticated={this.props.isLogged}/>
                    <ProtectedRoute path="/agreement" exact={true} component={Agreement}
                                    authenticated={this.props.isLogged}/>
                </Switch>
            </Router>
        )
    }
}

function mapStateToProps(state) {
    return {
        isLogged: state.isLogged
    }
}

export default connect(mapStateToProps)(App);

