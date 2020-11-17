import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {createStore} from "redux";
import allReducers from './reducers'
import {Provider} from "react-redux";


export const store = createStore(
    allReducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

/*

const style = {
    backgroundColor: "black",
    borderTop: "1px solid #E7E7E7",
    textAlign: "right",
    padding: "20px",
    position: "fixed",
    left: "0",
    bottom: "0",
    height: "60px",
    width: "100%",
    color: "white"
};

const phantom = {
    display: 'block',
    padding: '20px',
    height: '60px',
    width: '100%',
};


const Footer = () => {
    return (
        <div>
            <div style={phantom}/>
            <div style={style}>
                Copyright © 2020 Rendin
            </div>
        </div>
    )
};

 */


ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
