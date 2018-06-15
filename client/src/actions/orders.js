import serverReq from '../helpers/serverReq';

// export const deleteOrder = id => ({
//   type: 'DELETE_ORDER',
//   mealId: id
// });

/**
 * Redux action that sets Customer orders in redux store
 *
 * @param  {Object} - consist of details about the order
 * @return {Object}  - action object
 */
export const setCustomerOrders = ({
  success,
  orders: history,
  grandTotalPrice,
  message
}) => ({
  type: 'SET_CUSTOMER_ORDERS',
  orders: {
    success,
    history,
    grandTotalPrice,
    message
  }
});

const orderServerRes = ({ success, message }) => ({
  type: 'ORDER_SERVER_RES',
  serverRes: {
    success,
    message
  }
});

export const setEditOrder = ({
  orderId,
  deliveryAddress,
  orderedMeals,
  totalPrice
}) => ({
  type: 'SET_EDIT_ORDER',
  editOrder: {
    orderId,
    deliveryAddress,
    orderedMeals,
    totalPrice
  }
});

export const updateMealPortion = ({
  mealId,
  portion
}) => ({
  type: 'UPDATE_MEAL_PORTION',
  meal: {
    mealId,
    portion
  }
});

export const updateDelAddress = deliveryAddress => ({
  type: 'UPDATE_DELIVERY_ADDRESS',
  address: deliveryAddress
});

export const deleteMealInEditOrder = id => ({
  type: 'DEL_MEAL_EDIT_ORDER',
  mealId: id
});

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
      dispatch(orderServerRes({ success, message }));
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
  // axios.post()
  serverReq('delete', `/api/v1/orders/${id}`)
    .then((res) => {
      const { success, message } = res.data;
      dispatch(orderServerRes({ success, message }));
    })
    .catch(err => err);
};

