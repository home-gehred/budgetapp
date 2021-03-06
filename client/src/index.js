import React from 'react';
import ReactDOM from 'react-dom';
//import Bootstrap from "../../node_modules/bootstrap/dist/css/bootstrap.css";
import { Provider } from "react-redux";
import Layout from "./components/Layout";
import Store from "./store";
import './index.css';
//import App from './App';
import * as serviceWorker from './serviceWorker';

const app = document.getElementById("app");
ReactDOM.render(
  <Provider store={Store}>
    <Layout/>
  </Provider>, app);// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
