import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from '../components/common/Header';
import HomePage from '../components/homepage/Index';
import LogInPage from '../components/loginpage/Index';
import SignUpPage from '../components/signuppage/Index';
import chooseDashboard from '../components/HOCs/chooseDashboard';
import adminOnly from '../components/HOCs/adminOnly';
import customerOnly from '../components/HOCs/customerOnly';
import CustomerDashboard from '../components/customerpages/dashboard/Index';
import CustomerOrder from '../components/customerpages/order';
import Cart from '../components/customerpages/Cart';
import CheckLogin from '../components/HOCs/checkLogin';
import AdminDashboard from '../components/adminpages/dashboard/Index';
import MealPage from '../components/adminpages/mealPage/Index';
import NotFoundPage from '../components/common/NotFound';

const AppRouter = () => (
  <Router>
    <div>
      <Header />
      <Switch>
        <Route path="/" exact component={CheckLogin(HomePage)} />
        <Route path="/signUp" exact component={SignUpPage} />
        <Route path="/login" component={LogInPage} />
        <Route
          path="/dashboard"
          component={chooseDashboard(AdminDashboard, CustomerDashboard)}
        />
        <Route path="/cart" exact component={customerOnly(Cart)} />
        <Route path="/orders" exact component={customerOnly(CustomerOrder)} />
        <Route path="/mealpage" exact component={adminOnly(MealPage)} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
