/* eslint function-paren-newline: 0 */

import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import navLinksReducers from '../reducers/navLinks';

export default () => {
  const store = createStore(
    combineReducers(
      {
        navLinks: navLinksReducers
      }
    ),
    applyMiddleware(thunk));
  return store;
};

