import {
  ADD_MEAL_TO_CART,
  UPDATE_CART_MEAL_PORTION,
  DELETE_MEAL_IN_CART,
  EMPTY_CART,
  SET_CART_FROM_LS
} from '../actions/actiontypes';

const cartDefaultState = {
  meals: [],
  totalPrice: 0
};

const cartReducer = (state = cartDefaultState, action) => {
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
    case SET_CART_FROM_LS:
      return {
        ...state,
        ...action.cart
      };
    default:
      return state;
  }
};

export default cartReducer;
