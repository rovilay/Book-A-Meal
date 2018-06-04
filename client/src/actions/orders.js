const setCustomerOrders = ({
  success,
  orders,
  grandTotalPrice,
  message
}) => ({
  type: 'SET_CUSTOMER_ORDERS',
  orders: {
    success,
    orders,
    grandTotalPrice,
    message
  }
});

export default setCustomerOrders;
