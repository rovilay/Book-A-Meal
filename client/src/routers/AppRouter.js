/* eslint no-unused-vars:0 */
/* eslint import/no-named-as-default:0 */
import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import history from '../helpers/history';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import HomePage from '../components/Homepage';
import LogInPage from '../components/loginpage/Index';
import SignUpPage from '../components/signuppage/Index';
import ChooseDashboard from '../components/HOCs/ChooseDashboard';
import AdminOnly from '../components/HOCs/AdminOnly';
import CustomerOnly from '../components/HOCs/CustomerOnly';
import CustomerDashboard from '../components/customerpages/Dashboard';
import CustomerOrderPage from '../components/customerpages/orderPage/Index';
import Cart from '../components/customerpages/cart/Index';
import CheckLogin from '../components/HOCs/CheckLogin';
import AdminDashboard from '../components/adminpages/dashboard/Index';
import MealPage from '../components/adminpages/mealPage/Index';
import OrderPage from '../components/adminpages/orderPage/Index';
import NotFoundPage from '../components/NotFoundPage';

const AppRouter = () => (
  <ConnectedRouter history={history}>
    <div>
      <Header />
      <Switch>
        <Route
          exact
          path="/"
          component={CheckLogin(HomePage)}
        />
        <Route
          exact
          path="/signUp"
          component={CheckLogin(SignUpPage)}
        />
        <Route
          exact
          path="/login"
          component={CheckLogin(LogInPage)}
        />
        <Route
          exact
          path="/dashboard"
          component={ChooseDashboard(AdminDashboard, CustomerDashboard)}
        />
        <Route
          exact
          path="/cart"
          component={CustomerOnly(Cart)}
          className="main"
        />
        <Route
          exact
          path="/orders"
          component={CustomerOnly(CustomerOrderPage)}
        />
        <Route
          exact
          path="/mealpage"
          component={AdminOnly(MealPage)}
        />
        <Route
          exact
          path="/orderHistory"
          component={AdminOnly(OrderPage)}
        />
        <Route
          exact
          path="/*"
          component={NotFoundPage}
        />
      </Switch>
      <Footer />
    </div>
  </ConnectedRouter>
);

export default AppRouter;
