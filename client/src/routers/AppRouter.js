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
        <Route exact path="/" component={CheckLogin(HomePage)} />
        <Route exact path="/signUp" component={SignUpPage} />
        <Route exact path="/login" component={LogInPage} />
        <Route exact path="/dashboard" component={chooseDashboard(AdminDashboard, CustomerDashboard)} />
        <Route exact path="/cart" component={customerOnly(Cart)} className="main" />
        <Route exact path="/orders" component={customerOnly(CustomerOrder)} />
        <Route exact path="/mealpage" component={adminOnly(MealPage)} />
        <Route exact path="/orderHistory" component={adminOnly(OrderPage)} />
        <Route exact path="/*" component={NotFoundPage} />
      </Switch>
      <Footer />
    </div>
  </ConnectedRouter>
);

export default AppRouter;
