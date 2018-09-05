import arraySort from 'array-sort';
import jwt from 'jsonwebtoken';

import serverReq from '../helpers/serverReq';
import notify from '../helpers/notify';
import { emptyCart } from './cartActions';
import { setModal } from './modalActions';
import { getFromLs } from '../helpers/Ls';
import {
  DELETE_MEAL_IN_EDIT_ORDER,
  DELETE_ORDER_SUCCESS,
  UPDATE_ORDER_SUCCESS,
  SET_EDIT_ORDER,
  SET_ORDERS,
  SET_ORDER_MEALS,
  UPDATE_ORDERED_MEAL_PORTION
} from './actiontypes';

/**
 * Redux action that sets edit order to store
 *
 * @param {Object}  - object with properties orderId,deliveryAddress, orderedMeals and totalprice
 * @returns {Object} - returns object of action type and editOrder properties
 */
export const setEditOrder = ({
  orderId,
  deliveryAddress,
  orderedMeals,
  totalPrice
}) => ({
  type: SET_EDIT_ORDER,
  editOrder: {
    orderId,
    deliveryAddress,
    orderedMeals,
    totalPrice
  }
});

/**
 *
 * @param {string} orderId id or order to delete in order history
 * @param {string} orderId updates order history on delete
 */
export const deleteOrderSuccess = orderId => (dispatch, getState) => {
  const { history } = getState().orders;
  return dispatch({
    type: DELETE_ORDER_SUCCESS,
    modifiedOrder: history.filter(order => order.id !== orderId)
  });
};

/**
 *
 * @param {array} orders orders
 * @param {number} grandTotalPrice  total cost of orders
 * @param {object} pagination  pagination data
 */
export const setOrders = ({
  orders: history,
  grandTotalPrice,
  pagination
}) => dispatch => (
  dispatch({
    type: SET_ORDERS,
    orders: {
      history,
      grandTotalPrice,
      pagination
    }
  })
);

/**
 *
 * @param {string} orderId id of order to update in order history
 * @param {string} updatedOrderMeals meals of the updated order
 */
export const updateOrderSuccess = (orderId, updatedOrderMeals) => (dispatch, getState) => {
  const { history } = getState().orders;
  const updatedOrder = history.map((order) => {
    if (order.id === orderId) {
      order.Meals = updatedOrderMeals;
    }
  });
  return dispatch({
    type: UPDATE_ORDER_SUCCESS,
    updatedOrder
  });
};

/**
 * Redux action that update order meal portion in store
 *
 * @param {Object}  - object with property mealId and portion
 * @returns {Object} - returns object of action type and meal properties
 */
export const updateOrderedMealPortion = ({
  mealId,
  portion
}) => (dispatch, getState) => {
  const { orderedMeals } = getState().orders.editOrder;
  let totalPrice = 0;
  orderedMeals.map((meal) => {
    if (meal.id === mealId) {
      meal.portion = portion;
      meal.price = portion * meal.cost;
    }
    totalPrice += meal.price;
  });
  return dispatch({
    type: UPDATE_ORDERED_MEAL_PORTION,
    updatedOrder: {
      totalPrice,
      orderedMeals
    }
  });
};

/**
 * Redux action that delete ordered meal in store
 *
 * @param {string} mealId - Id of meal to delete
 * @returns {Object} - returns object of action type and mealId
 */
export const deleteMealInEditOrder = mealId => (dispatch, getState) => {
  /* eslint prefer-const:0 */
  let { orderedMeals, totalPrice } = getState().orders.editOrder;
  orderedMeals.map((meal, i) => {
    if (meal.id === mealId) {
      orderedMeals.splice(i, 1);
      totalPrice -= meal.price;
    }
  });

  return dispatch({
    type: DELETE_MEAL_IN_EDIT_ORDER,
    modifiedOrder: {
      orderedMeals,
      totalPrice
    }
  });
};

export const getOrders = ({ limit = 10, offset = 0 }) => dispatch => (
  serverReq('get', `/api/v1/orders?limit=${limit}&offset=${offset}`)
    .then((res) => {
      if (res.data) {
        const {
          success,
          orders: history,
          grandTotalPrice,
          pagination
        } = res.data;

        if (success) {
          dispatch({
            type: SET_ORDERS,
            orders: {
              history,
              grandTotalPrice,
              pagination
            }
          });
        }
        return res.data;
      }
    })
    .catch(err => err)
);

/**
 * Sends async server requests to get order meals using the axios api
 *
 * @param  {string} userId - Id of user to get order
 * @param  {number} limit - pagination limit
 * @param  {number} offset - pagination offset
 * @return {Function} - dispatches an set customer order action to the redux store
 */
export const getOrderMeals = (mealsUrl, { limit = 5, offset = 0 }) => dispatch => (
  serverReq('get', `${mealsUrl}?limit=${limit}&offset=${offset}`)
    .then((res) => {
      if (res.data) {
        const {
          success,
          order,
          pagination
        } = res.data;

        if (success) {
          dispatch({
            type: SET_ORDER_MEALS,
            order: {
              orderedMeals: order[0].Meals,
              orderedMealsPagination: pagination
            }
          });
        }

        return res.data;
      }
    })
    .catch(err => err)
);

/**
 * Sends async server requests to get all orders using the axios api
 *
 * @return {Function} - function that dispatches setOrders and serverRes action to the redux store
 */
export const getAllOrders = ({ limit = 10, offset = 0 }) => (dispatch) => {
  serverReq('get', `/api/v1/orders?limit=${limit}&offset=${offset}`)
    .then((response) => {
      if (response.data) {
        const {
          success,
          grandTotalPrice,
          pagination,
          orders: history
        } = response.data;

        if (success) {
          dispatch({
            type: SET_ORDERS,
            orders: {
              history: arraySort(history, 'createdAt', { reverse: true }),
              grandTotalPrice,
              pagination
            }
          });
        }
      }
    })
    .catch(err => err);
};


/**
 * Sends async server requests to update order using the axios api
 *
 * @param  {string} id - ID of order to update
 * @param  {Object} data - payload of updated meals
 * @return {Function} - dispatches an Update order action to the redux store
 */
export const updateOrder = (id, data) => (dispatch) => {
  serverReq('put', `/api/v1/orders/${id}`, data)
    .then((res) => {
      const { success, message } = res.data;
      if (success) {
        notify(message, 'toast-success');
        const { id: userId } = jwt.decode(getFromLs('jwt'));
        dispatch(getOrders({}));
        dispatch(setModal({}));
      } else {
        notify(message, 'toast-danger');
      }
    })
    .catch(err => err);
};

/**
 * Sends async server requests to delete order using the axios api
 *
 * @param  {string} id - ID of order to delete
 * @return {Function} - dispatches server response to store action to the redux store
 */
export const deleteOrder = id => (dispatch) => {
  serverReq('delete', `/api/v1/orders/${id}`)
    .then((res) => {
      const { message } = res.data;
      if (res.status === 204) {
        notify('Order canceled!', 'toast-success');
        dispatch(deleteOrderSuccess(id));
      } else {
        notify(message, 'toast-danger');
      }
    })
    .catch(err => err);
};

/**
 * Places order
 * Sends ordered meals to server
 */
export const postOrder = (deliveryAddress, meals) => (dispatch) => {
  serverReq('post', '/api/v1/orders', { deliveryAddress, meals })
    .then((response) => {
      const { success, message } = response.data;
      if (success) {
        dispatch(emptyCart());
        notify(message, 'toast-success', 'top-center');
      } else {
        notify(message, 'toast-danger');
      }
    })
    .catch(err => notify(err, 'toast-danger'));
};
