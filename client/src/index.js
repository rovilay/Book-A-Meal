/* eslint no-console: 0 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

import { persistor, store } from './store/configureStore';
import AppRouter from './routers/AppRouter';
import './assets/scss/style.scss';
import './assets/css/login.css';
import './assets/css/meal-option.css';
import './assets/css/menu.css';
import './assets/css/admin.css';
import './assets/css/table.css';

// store.subscribe(() => {
//   const state = store.getState();
//   console.log(state);
// });

const jsx = (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AppRouter />
    </PersistGate>
  </Provider>
);

ReactDOM.render(jsx, document.querySelector('#root'));
