/* eslint function-paren-newline: 0 */
import { combineReducers } from 'redux';

import navLinksReducer from './navLinksReducer';
import signUpReducer from './signupReducer';
import loginReducer from './loginReducer';
import menuReducer from './menuReducer';
import cartReducer from './cartReducer';
import ordersReducer from './ordersReducer';
import modalReducer from './modalReducer';
import mealReducer from './mealReducer';
import filterReducer from './filterReducer';

const rootReducer = combineReducers(
  {
    cart: cartReducer,
    filter: filterReducer,
    login: loginReducer,
    meal: mealReducer,
    menu: menuReducer,
    modal: modalReducer,
    navLinks: navLinksReducer,
    orders: ordersReducer,
    signUp: signUpReducer
  }
);

export default rootReducer;
