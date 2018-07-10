const cartTotPriceDefaultState = 0;

const cartTotPriceReducer = (state = cartTotPriceDefaultState, action) => {
  switch (action.type) {
    case 'SET_CART_TOTAL_PRICE':
      return action.totPrice;
    default:
      return state;
  }
};

export default cartTotPriceReducer;
