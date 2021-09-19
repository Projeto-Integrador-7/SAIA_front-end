import React from "react"
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Home from './pages/Home';
import EducationalTest from "./pages/EducationalTest";
import ForgottenPassword from "./pages/ForgottenPassword";

import history from './history/index';


export default function Routes() {
  return (
    <BrowserRouter history={history}>
      <Switch>
        <Route path="/forgotten_password" component={ForgottenPassword} />
        <Route path="/home" component={Home} />
        <Route path="/educational_test" component={EducationalTest} />
        <Route path="/" component={Login} />
      </Switch>
    </BrowserRouter>
  )
}