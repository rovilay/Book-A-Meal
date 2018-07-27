import { SET_CART_TOTAL_PRICE } from './actiontypes';

/**
 * sets cart total price
 * @param {number} totPrice cart total price
 */
const setCartTotalPrice = totPrice => ({
  type: SET_CART_TOTAL_PRICE,
  totPrice
});

export default setCartTotalPrice;
