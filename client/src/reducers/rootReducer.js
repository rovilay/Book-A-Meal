/* eslint function-paren-newline: 0 */

import { combineReducers } from 'redux';

import navLinksReducer from './navLinks';
import signUpReducer from './signup';
import loginReducer from './login';
import menuReducer from './menu';
import cartReducer from './cart';
import cartTotPriceReducer from './cartTotPr';

const rootReducer = combineReducers(
  {
    navLinks: navLinksReducer,
    signUp: signUpReducer,
    login: loginReducer,
    todayMenu: menuReducer,
    cart: cartReducer,
    cartTotalPrice: cartTotPriceReducer
  }
);

export default rootReducer;
