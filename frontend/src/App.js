import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Index from "./views/Index.jsx";
import Login from "./views/Login.jsx";
import Profile from "./views/Profile.jsx";
import Register from "./views/Register.jsx";
import './App.css';

function App() {
  return (
    <BrowserRouter>
    <Switch>
      <Route path="/" exact render={props => <Index {...props} />} />

      <Route path="/login-page" exact render={props => <Login {...props} />} />
      <Route
        path="/profile-page"
        exact
        render={props => <Profile {...props} />}
      />
      <Route
        path="/register-page"
        exact
        render={props => <Register {...props} />}
      />
      <Redirect to="/" />
    </Switch>
  </BrowserRouter>
  );
}

export default App;
