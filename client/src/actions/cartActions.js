import {
  ADD_MEAL_TO_CART,
  UPDATE_CART_MEAL_PORTION,
  DELETE_MEAL_IN_CART,
  EMPTY_CART,
} from './actiontypes';


export const addMealToCart = meal => dispatch => dispatch({
  type: ADD_MEAL_TO_CART,
  meal
});

export const updateCartMealPortion = ({
  id,
  portion
}) => dispatch => dispatch({
  type: UPDATE_CART_MEAL_PORTION,
  meal: {
    id,
    portion
  }
});

export const deleteMealInCart = meal => (dispatch) => {
  dispatch({
    type: DELETE_MEAL_IN_CART,
    meal
  });
};

export const emptyCart = () => ({
  type: EMPTY_CART,
});
