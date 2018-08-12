/* eslint no-console: 0 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { PersistGate } from 'redux-persist/lib/integration/react';

import store from './store/configureStore';
import AppRouter from './routers/AppRouter';
// import './assets/scss/style.scss';
// import './assets/css/meal-option.css';
// import './assets/css/style.css';
// import './assets/css/signup.css';
// import './assets/css/menu.css';
// import './assets/css/newadmin.css';
// import './assets/css/newtable.css';
// import './assets/css/mealCard.css';


import './assets/css/button.css';
import './assets/css/test.css';
import './assets/css/header.css';
import './assets/css/login.css';
import './assets/css/try.css';
import './assets/css/customer.css';
import './assets/css/table.css';
import './assets/css/modal.css';
import './assets/css/admin-1.css';
import './assets/css/filter.css';
import './assets/css/row.css';
import './assets/css/newMenu.css';

// const jsx = (
//   <Provider store={store}>
//     <PersistGate loading={null} persistor={persistor}>
//       <AppRouter />
//     </PersistGate>
//   </Provider>
// );

const jsx = (
  <Provider store={store}>
    <div>
      <AppRouter />
      <ToastContainer />
    </div>
  </Provider>
);

ReactDOM.render(jsx, document.querySelector('#root'));
