/* eslint function-paren-newline: 0 */

import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import navLinksReducer from '../reducers/navLinks';
import signUpReducer from '../reducers/signup';
import loginReducer from '../reducers/login';

export default () => {
  const store = createStore(
    combineReducers(
      {
        navLinks: navLinksReducer,
        signUp: signUpReducer,
        login: loginReducer
      }
    ),
    composeWithDevTools(
      applyMiddleware(thunk)
    )
  );
  return store;
};

