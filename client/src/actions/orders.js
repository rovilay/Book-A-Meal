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
  deliveryAddress,
  orderedMeals
}) => ({
  type: 'SET_EDIT_ORDER',
  editOrder: {
    deliveryAddress,
    orderedMeals
  }
});

export const deleteMealInEditOrder = id => ({
  type: 'DEL_MEAL_EDIT_ORDER',
  mealId: id
});

