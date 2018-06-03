const cartDefaultState = [];

const cartReducer = (state = cartDefaultState, action) => {
  switch (action.type) {
    case 'ADD_MEAL_TO_CART':
      return (() => {
        const temp = [...state];
        let isPresent = false;
        temp.map((meal) => {
          if (meal.id === action.meal.id) {
            meal.portion += action.meal.portion;
            isPresent = true;
          }
        });

        if (!isPresent) {
          return [...state, action.meal];
        }

        if (isPresent) {
          return temp;
        }
      })();
    case 'EMPTY_CART':
      return [];
    case 'DELETE_MEAL_IN_CART':
      return (() => {
        const temp = [...state];
        temp.splice(action.mealPos, 1);
        return temp;
      })();
    default:
      return state;
  }
};

export default cartReducer;
