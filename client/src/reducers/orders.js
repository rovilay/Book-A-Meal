const ordersDefaultState = {
  success: false,
  message: '',
  grandTotalPrice: 0,
  history: [],
  editOrder: {},
  serverRes: {}
};

const ordersReducer = (state = ordersDefaultState, action) => {
  switch (action.type) {
    case 'SET_CUSTOMER_ORDERS':
      return {
        ...state,
        ...action.orders
      };
    case 'SET_EDIT_ORDER':
      return {
        ...state,
        editOrder: {
          ...action.editOrder
        }
      };
    case 'UPDATE_MEAL_PORTION':
      return (() => {
        const { mealId, portion: newPortion } = action.meal;
        const { deliveryAddress, orderedMeals, orderId } = state.editOrder;
        const temp = orderedMeals;
        let totalPrice = 0;
        let res;
        temp.map((meal) => {
          const { id, unitPrice } = meal;
          if (id === mealId) {
            meal.portion = parseInt(newPortion, 10);
            meal.price = meal.portion * unitPrice;
            totalPrice += meal.price;
          } else {
            meal.price = meal.portion * unitPrice;
            totalPrice += meal.price;
          }
          res = temp;
        });
        return {
          ...state,
          editOrder: {
            orderId,
            deliveryAddress,
            orderedMeals: [...res],
            totalPrice
          }
        };
      })();
    case 'DEL_MEAL_EDIT_ORDER':
      return (() => {
        const { deliveryAddress, orderedMeals } = state.editOrder;
        const temp = orderedMeals;
        let res;
        temp.map((meal, i) => {
          if (meal.id === action.mealId) {
            temp.splice(i, 1);
          }
          res = temp;
        });
        return {
          ...state,
          editOrder: {
            deliveryAddress,
            orderedMeals: [...res]
          }
        };
      })();
    case 'ORDER_SERVER_RES':
      return {
        ...state,
        serverRes: { ...action.serverRes }
      };
    default:
      return state;
  }
};

export default ordersReducer;
