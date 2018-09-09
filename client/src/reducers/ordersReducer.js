import {
  DELETE_MEAL_IN_EDIT_ORDER,
  DELETE_ORDER_SUCCESS,
  SET_EDIT_ORDER,
  SET_ORDERS,
  UPDATE_ORDERED_MEAL_PORTION,
  SET_ORDER_MEALS
} from '../actions/actiontypes';
import * as helpers from '../helpers/reducers-helpers/order-helpers';

export const ordersDefaultState = {
  grandTotalPrice: 0,
  history: [],
  orderMeals: [],
  editOrder: {},
  orderedMeals: [],
  orderedMealsPagination: {
    limit: 5,
    offset: 0,
    numOfPages: 1,
    count: 0
  },
  pagination: {
    limit: 10,
    offset: 0,
    numOfPages: 1,
    count: 0
  }
};

export const ordersReducer = (state = ordersDefaultState, action) => {
  switch (action.type) {
    case SET_ORDERS:
      return {
        ...state,
        ...action.orders
      };
    case SET_ORDER_MEALS:
      return {
        ...state,
        ...action.order
      };
    case SET_EDIT_ORDER:
      return {
        ...state,
        editOrder: {
          ...action.editOrder
        }
      };
    case UPDATE_ORDERED_MEAL_PORTION:
      return helpers.updateMealPortion(state, action.meal);
    case DELETE_MEAL_IN_EDIT_ORDER:
      return helpers.deleteMeal(state, action.mealId);
    case DELETE_ORDER_SUCCESS:
      return {
        ...state,
        history: state.history.filter(order => order.id !== action.orderId)
      };
    default:
      return state;
  }
};
