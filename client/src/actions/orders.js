import serverReq from '../helpers/serverReq';

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

/**
 * Redux action that sets order server response to store
 *
 * @param {Object}  - object with property success and message
 * @returns {Object} - returns object of action type and serverRes
 */
export const orderServerRes = ({ success, message }) => ({
  type: 'ORDER_SERVER_RES',
  serverRes: {
    success,
    message
  }
});

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
  type: 'SET_EDIT_ORDER',
  editOrder: {
    orderId,
    deliveryAddress,
    orderedMeals,
    totalPrice
  }
});

/**
 * Redux action that update order meal portion in store
 *
 * @param {Object}  - object with property mealId and portion
 * @returns {Object} - returns object of action type and meal properties
 */
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

// /**
//  *
//  * @param {string} deliveryAddress - address of meal to delete
//  * @returns {Object} - returns object of action type and mealId properties
//  */
// export const updateDelAddress = deliveryAddress => ({
//   type: 'UPDATE_DELIVERY_ADDRESS',
//   address: deliveryAddress
// });

/**
 * Redux action that delete ordered meal in store
 *
 * @param {string} id - Id of meal to delete
 * @returns {Object} - returns object of action type and mealId
 */
export const deleteMealInEditOrder = id => ({
  type: 'DEL_MEAL_EDIT_ORDER',
  mealId: id
});

/**
 * Sends async server requests to get orders using the axios api
 *
 * @param  {string} userId - Id of user to get order
 * @return {Function} - dispatches an set customer order action to the redux store
 */
export const getOrders = userId => (dispatch) => {
  serverReq('get', `/api/v1/orders/${userId}`)
    .then((res) => {
      if (res.data) {
        const {
          success,
          message,
          orders,
          grandTotalPrice
        } = res.data;
        dispatch(setCustomerOrders({
          success,
          message,
          orders,
          grandTotalPrice
        }));
      }
    })
    .catch((err) => {
      console.log(err);
    });
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

