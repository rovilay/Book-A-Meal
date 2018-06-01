import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from '../components/common/Header';
import HomePage from '../components/homepage/Index';
import LogInPage from '../components/loginpage/Index';
import SignUpPage from '../components/signuppage/Index';
import chooseDashboard from '../helpers/chooseDashboard';
import CustomerDashboard from '../components/customerpages/Index';
import AdminDashboard from '../components/adminpages/Index';
import NotFoundPage from '../components/common/NotFound';

const AppRouter = () => (
  <Router>
    <div>
      <Header />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/signUp" exact component={SignUpPage} />
        <Route path="/login" component={LogInPage} />
        <Route
          path="/dashboard"
          component={chooseDashboard(AdminDashboard, CustomerDashboard)}
        />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
