import {
  ADD_MEAL_TO_CART,
  UPDATE_CART_MEAL_PORTION,
  DELETE_MEAL_IN_CART,
  EMPTY_CART,
} from '../actions/actiontypes';

export const cartDefaultState = {
  meals: [],
  totalPrice: 0
};

export const cartReducer = (state = cartDefaultState, action) => {
  switch (action.type) {
    case ADD_MEAL_TO_CART:
      return {
        ...state,
        ...action.cart
      };
    case DELETE_MEAL_IN_CART:
      return {
        ...state,
        ...action.modifiedCart
      };
    case EMPTY_CART:
      return {
        ...cartDefaultState
      };
    case UPDATE_CART_MEAL_PORTION:
      return {
        ...state,
        ...action.updatedCart
      };
    default:
      return state;
  }
};
