import jwt from 'jsonwebtoken';

import { getFromLs } from '../helpers/Ls';
import isExpired from '../helpers/isExpired';
import history from '../helpers/history';
import notify from '../helpers/notify';
import {
  ADD_MEAL_TO_CART,
  UPDATE_CART_MEAL_PORTION,
  DELETE_MEAL_IN_CART,
  EMPTY_CART,
} from './actiontypes';


export const addMealToCart = ({
  id,
  title,
  price: unitPrice,
  portion = 1
}) => (
  (dispatch, getState) => {
    /* eslint prefer-const: 0 */
    let { meals, totalPrice } = getState().cart;

    // check if meal already in cart
    const newMeals = meals.filter(meal => meal.id !== id);

    if (meals.length === 0 || newMeals.length === meals.length) {
      totalPrice += unitPrice * portion;
      const cart = {
        meals: [
          ...newMeals,
          {
            id,
            title,
            unitPrice,
            portion,
            price: unitPrice * portion
          }
        ],
        totalPrice
      };

      dispatch({
        type: ADD_MEAL_TO_CART,
        cart,
      });

      return notify('Meal added to cart', 'toast-success', 'bottom-left');
    }
    if (newMeals.length !== meals.length) {
      notify('Meal already in cart!', 'toast-danger', 'bottom-left');
    }
  }
);

export const updateCartMealPortion = ({ id, portion }) => (
  (dispatch, getState) => {
    const { meals } = getState().cart;
    const newMeals = [...meals];
    let totalPrice = 0;
    newMeals.map((meal) => {
      if (meal.id === id) {
        meal.portion = portion;
        meal.price = portion * meal.unitPrice;
      }
      totalPrice += meal.price;
    });

    const updatedCart = {
      meals: newMeals,
      totalPrice
    };

    dispatch({
      type: UPDATE_CART_MEAL_PORTION,
      updatedCart
    });
  }
);

export const deleteMealInCart = ({ id, price }) => (
  (dispatch, getState) => {
    /* eslint prefer-const: 0 */
    let { meals, totalPrice } = getState().cart;

    // check if meal already in cart
    const newMeals = meals.filter(meal => meal.id !== id);

    if (meals.length === 0 || newMeals.length !== meals.length) {
      totalPrice -= price;

      const modifiedCart = {
        meals: newMeals,
        totalPrice
      };

      dispatch({
        type: DELETE_MEAL_IN_CART,
        modifiedCart
      });
    }
  }
);

export const addToCart = mealData => (dispatch) => {
  const token = getFromLs('jwt');
  if (token) {
    const { exp, admin } = jwt.decode(token);
    if (!isExpired(exp) && !admin) {
      dispatch(addMealToCart(mealData));
    }
  } else {
    history.push('/login');
  }
};

export const emptyCart = () => ({
  type: EMPTY_CART,
});
