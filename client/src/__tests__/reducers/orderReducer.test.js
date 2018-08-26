import { ordersDefaultState, ordersReducer } from '../../reducers/ordersReducer';
import {
  DELETE_MEAL_IN_EDIT_ORDER,
  DELETE_ORDER_SUCCESS,
  SET_ORDERS,
  UPDATE_ORDERED_MEAL_PORTION,
  SET_ORDER_MEALS
} from '../../actions/actiontypes';
import { setEditOrder } from '../../actions/ordersActions'
import { orders, pagination, orderMeals, orderOnEdit } from '../__mockData__/orderMock';


describe('Orders reducer', () => {
  it('should add orders to state', (done) => {
    const action = {
      type: SET_ORDERS,
      orders: {
        history: orders,
        grandTotalPrice: 1100,
        pagination
      }
    };
    const newState = ordersReducer(ordersDefaultState, action);
    expect(newState.history).toEqual(orders);
    expect(newState.pagination).toEqual(pagination);

    done();
  });


  it('should add order meals to state', (done) => {
    const action = {
      type: SET_ORDER_MEALS,
      order: {
        orderedMeals: orderMeals,
        orderedMealsPagination: pagination
      }
    };
    const newState = ordersReducer(ordersDefaultState, action);
    expect(newState.orderedMeals).toEqual(orderMeals);
    expect(newState.orderedMealsPagination).toEqual(pagination);

    done();
  });


  it('should delete order from orders state', (done) => {
    const currentState = {
      ...ordersDefaultState,
      history: orders
    }

    const action = {
      type: DELETE_ORDER_SUCCESS,
      modifiedOrder: orders.slice(0, 2)
    };

    const newState = ordersReducer(currentState, action);
    expect(newState.history).toEqual(orders.slice(0, 2));

    done();
  });


  it('should update order meals portion', (done) => {
    const currentState = {
      ...ordersDefaultState,
      editOrder: {
        orderedMeals: orderMeals[0],
        totalPrice: 300
      }
    }

    const action = {
      type: UPDATE_ORDERED_MEAL_PORTION,
      updatedOrder: {
        totalPrice: 600,
        orderedMeals: {
          ...orderMeals[0],
          portion: 2,
          price: 600
        }
      }
    };

    const newState = ordersReducer(currentState, action);
    expect(newState.editOrder).toEqual({
      totalPrice: 600,
      orderedMeals: {
        ...orderMeals[0],
        portion: 2,
        price: 600
      }
    })

    done();
  });


  it('should set order for edit', (done) => {
    const action = setEditOrder(orderOnEdit)

    const newState = ordersReducer(ordersDefaultState, action);
    expect(newState.editOrder).toEqual(orderOnEdit)

    done();
  });


  it('should remove meal from order on edit', (done) => {
    const currentState = {
      ...ordersDefaultState,
      editOrder: orderOnEdit
    }
    const action = {
      type: DELETE_MEAL_IN_EDIT_ORDER,
      modifiedOrder: {
        ...orderOnEdit,
        orderedMeals: orderMeals.slice(0, 2),
        totalPrice: 500
      }
    }

    const newState = ordersReducer(currentState, action);
    expect(newState.editOrder.orderedMeals).toEqual(orderMeals.slice(0, 2));
    expect(newState.editOrder.totalPrice).toEqual(500);

    done();
  });

  it('should return state for unknown action type', (done) => {
    const action = {
      type: undefined
    };
    const newState = ordersReducer(ordersDefaultState, action);
    expect(newState).toEqual(ordersDefaultState);

    done();
  });
});
