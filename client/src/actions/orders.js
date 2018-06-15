import serverReq from '../helpers/serverReq';

/**
 * Sends async server requests using the axios api
 *
 * @param  {Object} - payload of updated meals
 * @return {Function} that dispatches an Update order action to the redux store
 */
export const updateOrder = (id, data) => (dispatch) => {
  // axios.post()
  const { deliveryAddress, meals } = data;
  serverReq('put', `/api/v1/orders/${id}`, data)
    .then((res) => {
      console.log(res);
    })
    .catch(err => err);
};

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

export const setEditOrder = ({
  orderId,
  deliveryAddress,
  orderedMeals
}) => ({
  type: 'SET_EDIT_ORDER',
  editOrder: {
    orderId,
    deliveryAddress,
    orderedMeals
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

