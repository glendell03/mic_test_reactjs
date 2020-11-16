import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./component/auth/Login";
import Register from "./component/auth/Register";
import Landing from "./component/Landing";

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
