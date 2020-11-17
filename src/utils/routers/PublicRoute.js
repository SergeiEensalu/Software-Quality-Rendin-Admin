import React, {Component} from "react";
import {Redirect, Route} from "react-router-dom";
import {connect} from "react-redux";

class PublicRoute extends Component {

    render() {
        if (!this.props.isLogged) {
            return <Route {...this.props} />;
        } else {
            return <Redirect to="/profile"/>;
        }
    }
}

function mapStateToProps(state) {
    return {
        isLogged: state.isLogged
    }
}

export default connect(mapStateToProps)(PublicRoute);