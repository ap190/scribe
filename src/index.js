import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloLink, split } from "apollo-client-preset";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";
import registerServiceWorker from "./registerServiceWorker";

// import store from "./client/reducers";
import HomePage from "./client/components/HomePage";
import LoginPage from "./client/components/LoginPage";
import CreateAccountPage from "./client/components/CreateAccount";
import { graphCoolConstants } from "./client/utils/const";
import "./client/styles/index.css";

const serviceId = "cjb6feu9323cp0133gc3vuant";

const httpLink = new HttpLink({
  // uri: `https://api.graph.cool/simple/v1/${serviceId}`
  uri: `http://localhost:60000/simple/v1/cjbdtpolx000401102lorpw3r`
});

const middlewareAuthLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem(graphCoolConstants.GC_AUTH_TOKEN);
  const authorizationHeader = token ? `Bearer ${token}` : null;
  operation.setContext({
    headers: {
      authorization: authorizationHeader
    }
  });
  return forward(operation);
});

const httpLinkWithAuthToken = middlewareAuthLink.concat(httpLink);

const wsLink = new WebSocketLink({
  uri: `wss://subscriptions.graph.cool/v1/${serviceId}`,
  options: {
    reconnect: true,
    timeout: 600000,
    connectionParams: {
      authToken: localStorage.getItem(graphCoolConstants.GC_AUTH_TOKEN)
    }
  }
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLinkWithAuthToken
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <div className="app">
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route path="/home" component={HomePage} />
          <Route exact path="/createAccount" component={CreateAccountPage} />
        </Switch>
      </div>
    </Router>
  </ApolloProvider>,
  document.getElementById("root")
);
registerServiceWorker();
