import {
  DELETE_MEAL_IN_EDIT_ORDER,
  DELETE_ORDER_SUCCESS,
  SET_EDIT_ORDER,
  SET_ORDERS,
  UPDATE_ORDERED_MEAL_PORTION,
  SET_ORDER_MEALS
} from '../actions/actiontypes';

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
      return {
        ...state,
        editOrder: {
          ...state.editOrder,
          ...action.updatedOrder
        }
      };
    case DELETE_MEAL_IN_EDIT_ORDER:
      return {
        ...state,
        editOrder: {
          ...state.editOrder,
          ...action.modifiedOrder
        }
      };
    case DELETE_ORDER_SUCCESS:
      return {
        ...state,
        history: action.modifiedOrder
      };
    default:
      return state;
  }
};
