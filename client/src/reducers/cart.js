const cartDefaultState = [];

const cartReducer = (state = cartDefaultState, action) => {
  switch (action.type) {
    case 'ADD_MEAL_TO_CART':
      return state.push(action.meal);
    default:
      return state;
  }
};

export default cartReducer;
