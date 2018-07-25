import filterify from '../helpers/filter';

const ordersDefaultState = {
  success: false,
  message: '',
  grandTotalPrice: 0,
  history: [],
  filteredOrders: [],
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
        let { totalPrice } = state.editOrder;
        let res;
        temp.map((meal, i) => {
          if (meal.id === action.mealId) {
            temp.splice(i, 1);
            totalPrice -= meal.price;
          }
          res = temp;
        });
        return {
          ...state,
          editOrder: {
            deliveryAddress,
            orderedMeals: [...res],
            totalPrice
          }
        };
      })();
    case 'ORDER_SERVER_RES':
      return {
        ...state,
        serverRes: { ...action.serverRes }
      };
    case 'FILTER_CUSTOMER_ORDERS':
      return {
        ...state,
        filteredOrders: [...filterify(action.filter, state.history)],
        grandTotalPrice: (() => {
          let price = 0;
          [...filterify(action.filter, state.history)].forEach((order) => {
            price += order.totalPrice;
          });
          return price;
        })()
      };
    default:
      return state;
  }
};

export default ordersReducer;
