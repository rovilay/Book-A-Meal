/* eslint no-unused-vars:0 */
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import history from '../helpers/history';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import HomePage from '../components/Homepage';
import LogInPage from '../components/loginpage/Index';
import SignUpPage from '../components/signuppage/Index';
import chooseDashboard from '../components/HOCs/ChooseDashboard';
import adminOnly from '../components/HOCs/AdminOnly';
import customerOnly from '../components/HOCs/CustomerOnly';
import CustomerDashboard from '../components/customerpages/Dashboard';
import CustomerOrder from '../components/customerpages/orders/Index';
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
        <Route path="/" exact component={CheckLogin(HomePage)} />
        <Route path="/signUp" exact component={SignUpPage} />
        <Route path="/login" component={LogInPage} />
        <Route
          path="/dashboard"
          component={chooseDashboard(AdminDashboard, CustomerDashboard)}
        />
        <Route path="/cart" exact component={customerOnly(Cart)} className="main" />
        <Route path="/orders" exact component={customerOnly(CustomerOrder)} />
        <Route path="/mealpage" exact component={adminOnly(MealPage)} />
        <Route path="/orderHistory" exact component={adminOnly(OrderPage)} />
        <Route component={NotFoundPage} />
      </Switch>
      <Footer />
    </div>
  </ConnectedRouter>
);

export default AppRouter;
