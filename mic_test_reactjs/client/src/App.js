import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Landing from "./components/Landing";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuthenticated = async () => {
    if (localStorage.getItem("token")) {
      setIsAuthenticated(true);
    }
  };
  useEffect(() => {
    checkAuthenticated();
    console.log("rendered");
  }, [isAuthenticated]);

  return (
    <Router>
      <Switch>
        <Route exact path="/login">
          {!isAuthenticated ? (
            <Login setIsAuthenticated={setIsAuthenticated}></Login>
          ) : (
            <Redirect to="/" />
          )}
        </Route>
        <Route path="/register">
          {!isAuthenticated ? (
            <Register setIsAuthenticated={setIsAuthenticated}></Register>
          ) : (
            <Redirect to="/" />
          )}
        </Route>
        <Route path="/">
          {isAuthenticated ? (
            <Landing setIsAuthenticated={setIsAuthenticated} />
          ) : (
            <Redirect to="/login" />
          )}
          <Landing />
        </Route>
      </Switch>
    </Router>
  );
}
