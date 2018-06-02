const cartDefaultState = [];

const cartReducer = (state = cartDefaultState, action) => {
  switch (action.type) {
    case 'ADD_MEAL_TO_CART':
      return [...state, action.meal];
    case 'EMPTY_CART':
      return [];
    default:
      return state;
  }
};

export default cartReducer;
