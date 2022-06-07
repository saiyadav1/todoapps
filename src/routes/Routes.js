import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { Redirect } from "react-router-dom";
// import Login from "../Components/Login";
// import Dashboard from "../Components/Dashboard";
import Login from '../components/Login'
import Dashboard from "../components/Dashboard";
import ProtectedRoutes from "./ProtectedRoutes";
import DashboardRoutes from "./DashboardRoutes";

export default function Routes() {
  const { client } = useContext(AuthContext);
  return (
    <Router>
      {client && <Redirect to="/dashboard/home" />}
      {!client && <Redirect to="/" />}
      <Switch>
        <Route path="/" component={Login} exact />
        <Route path="/dashboard" component={DashboardRoutes} />
        {/* <ProtectedRoutes
          path="/dashboard"
          isAuth={isAuthenticated}
          component={DashboardRoutes}
        /> */}
      </Switch>
    </Router>
  );
}
