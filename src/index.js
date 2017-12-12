import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./client/reducers";
import HomePage from "./client/components/HomePage";
import LoginPage from "./client/components/LoginPage";
import "./client/styles/index.css";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div className="app">
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route exact path="/" component={LoginPage} />
        </Switch>
      </div>
    </Router>
  </Provider>,
  document.getElementById("root")
);
