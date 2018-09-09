import {
  ADD_MEAL_TO_CART,
  UPDATE_CART_MEAL_PORTION,
  DELETE_MEAL_IN_CART,
  EMPTY_CART,
} from '../actions/actiontypes';
import * as helpers from '../helpers/reducers-helpers/cart-helpers';

export const cartDefaultState = {
  meals: [],
  totalPrice: 0
};

export const cartReducer = (state = cartDefaultState, action) => {
  switch (action.type) {
    case ADD_MEAL_TO_CART:
      return helpers.addMeal(state, action.meal);
    case DELETE_MEAL_IN_CART:
      return helpers.deleteMeal(state, action.meal);
    case UPDATE_CART_MEAL_PORTION:
      return helpers.updateMealPortion(state, action.meal);
    case EMPTY_CART:
      return {
        ...cartDefaultState
      };
    default:
      return state;
  }
};
