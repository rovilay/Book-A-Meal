import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import store from './store/configureStore';
import AppRouter from './routers/AppRouter';

import './assets/scss/accordion.scss';
import './assets/scss/button.scss';
import './assets/scss/style.scss';
import './assets/scss/header.scss';
import './assets/scss/login.scss';
import './assets/scss/style2.scss';
import './assets/scss/customer.scss';
import './assets/scss/table.scss';
import './assets/scss/modal.scss';
import './assets/scss/admin.scss';
import './assets/scss/filter.scss';
import './assets/scss/row.scss';
import './assets/scss/menu.scss';
import './assets/scss/meal.scss';

const jsx = (
  <Provider store={store}>
    <div>
      <AppRouter />
      <ToastContainer />
    </div>
  </Provider>
);

ReactDOM.render(jsx, document.querySelector('#root'));
