import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./client/reducers";
import HomePage from "./client/components/HomePage";
import LoginPage from "./client/components/LoginPage";
import CreateAccountPage from "./client/components/CreateAccount";
import "./client/styles/index.css";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div className="app">
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route path="/home" component={HomePage} />
          <Route exact path="/createAccount" component={CreateAccountPage} />
        </Switch>
      </div>
    </Router>
  </Provider>,
  document.getElementById("root")
);
