/* eslint no-console: 0 */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';
import AppRouter from './routers/AppRouter';
import './assests/scss/style.scss';

const store = configureStore();

store.subscribe(() => {
  const state = store.getState();
  console.log(state);
});

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(jsx, document.querySelector('#root'));
