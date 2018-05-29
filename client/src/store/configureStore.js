/* eslint function-paren-newline: 0 */

import { createStore, combineReducers } from 'redux';

import navLinksReducers from '../reducers/navLinks';

export default () => {
  const store = createStore(
    combineReducers(
      {
        navLinks: navLinksReducers
      }
    ));
  return store;
};

