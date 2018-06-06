const setCustomerOrders = ({
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

export default setCustomerOrders;
