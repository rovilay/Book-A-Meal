/* eslint no-console: 0 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

import { persistor, store } from './store/configureStore';
import AppRouter from './routers/AppRouter';
// import './assets/scss/style.scss';
// import './assets/css/meal-option.css';
// import './assets/css/style.css';
// import './assets/css/signup.css';
// import './assets/css/menu.css';
// import './assets/css/newadmin.css';
// import './assets/css/newtable.css';
// import './assets/css/mealCard.css';
import './assets/css/test.css';
import './assets/css/header.css';
import './assets/css/login.css';
import './assets/css/try.css';
import './assets/css/customer.css';
import './assets/css/table.css';
import './assets/css/admin.css';

const jsx = (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AppRouter />
    </PersistGate>
  </Provider>
);

ReactDOM.render(jsx, document.querySelector('#root'));
