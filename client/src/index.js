import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import store from './store/configureStore';
import AppRouter from './routers/AppRouter';
import './assets/css/button.css';
import './assets/css/style.css';
import './assets/css/header.css';
import './assets/css/login.css';
import './assets/css/style2.css';
import './assets/css/customer.css';
import './assets/css/table.css';
import './assets/css/modal.css';
import './assets/css/admin.css';
import './assets/css/filter.css';
import './assets/css/row.css';
import './assets/css/menu.css';
import './assets/css/meal.css';

const jsx = (
  <Provider store={store}>
    <div>
      <AppRouter />
      <ToastContainer />
    </div>
  </Provider>
);

ReactDOM.render(jsx, document.querySelector('#root'));
