const ordersDefaultState = {
  success: false,
  message: '',
  grandTotalPrice: 0,
  history: []
};

const ordersReducer = (state = ordersDefaultState, action) => {
  switch (action.type) {
    case 'SET_CUSTOMER_ORDERS':
      return {
        ...action.orders
      };
    default:
      return state;
  }
};

export default ordersReducer;
