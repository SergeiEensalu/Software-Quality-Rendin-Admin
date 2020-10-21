import React, {Component} from "react";
import {HashRouter, Redirect, Route, Switch} from "react-router-dom";
import Header from "./components/Header";
import Item from "./components/Item";
import NotFound from "./components/NotFound";

class App extends Component {
    // Prevent page reload, clear input, set URL and push history on submit
    handleSubmit = (e, history, searchInput) => {
        e.preventDefault();
        e.currentTarget.reset();
        let url = `/search/${searchInput}`;
        history.push(url);
    };

    render() {
        return (
            <HashRouter>
                <div className="container">
                    <Route
                        render={props => (
                            <Header
                                handleSubmit={this.handleSubmit}
                                history={props.history}
                            />
                        )}
                    />
                    <Switch>
                        <Route exact path="/" render={() => <Redirect to="/payment"/>}/>
                        <Route path="/payment" render={() => <Item searchTerm="payment"/>}/>
                        <Route path="/settings" render={() => <Item searchTerm="settings"/>}/>
                        <Route component={NotFound}/>
                    </Switch>
                </div>
            </HashRouter>
        );
    }
}

export default App;
