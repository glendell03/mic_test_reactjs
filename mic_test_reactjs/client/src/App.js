import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./component/auth/login";
import Register from "./component/auth/register";
import Landing from "./component/landing";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/">
          <Landing />
        </Route>
      </Switch>
    </Router>
  );
}
