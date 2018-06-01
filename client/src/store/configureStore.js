/* eslint function-paren-newline: 0 */

import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import navLinksReducer from '../reducers/navLinks';
import signUpReducer from '../reducers/signup';
import loginReducer from '../reducers/login';
import menuReducer from '../reducers/menu';

export default () => {
  const store = createStore(
    combineReducers(
      {
        navLinks: navLinksReducer,
        signUp: signUpReducer,
        login: loginReducer,
        todayMenu: menuReducer
      }
    ),
    composeWithDevTools(
      applyMiddleware(thunk)
    )
  );
  return store;
};

