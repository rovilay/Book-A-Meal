import mockStore from '../__mockData__/mockStore';
// import notify from '../../helpers/notify'
import {
  orders,
  orderMeals,
  pagination
} from '../__mockData__/orderMock';
import {
  DELETE_MEAL_IN_EDIT_ORDER,
  DELETE_ORDER_SUCCESS,
  SET_EDIT_ORDER,
  EMPTY_CART,
  SET_ORDERS,
  UPDATE_ORDERED_MEAL_PORTION,
  SET_ORDER_MEALS
 } from '../../actions/actiontypes';
import {
  setEditOrder,
  deleteMealInEditOrder,
  deleteOrder,
  updateOrder,
  updateOrderedMealPortion,
  getAllOrders,
  getOrderMeals,
  getOrders,
  postOrder
} from '../../actions/ordersActions';
import { ordersDefaultState } from '../../reducers/ordersReducer';

describe('Menu Actions test', () => {
  beforeEach(() => { mock.reset(); });

  it('should dispatch `SET_ORDERS` on getting all orders', async (done) => {
    const store = mockStore(ordersDefaultState); // mock store

    mock.onGet('/api/v1/orders?limit=10&offset=0')
      .reply(200, {
        success: true,
        grandTotalPrice: 1100,
        pagination,
        orders,
      });

    const expectedAction = {
      type: SET_ORDERS,
      orders: {
        history: orders.reverse(),
        grandTotalPrice: 1100,
        pagination
      }
    };

    await store.dispatch(getAllOrders({}))
    const actions = store.getActions();
    expect(actions[0]).toEqual(expectedAction);
    expect(actions[0].orders.history).toHaveLength(3)

    done();
  });


  it('should dispatch `SET_ORDERS` on updating order', async (done) => {
    const store = mockStore(ordersDefaultState); // mock store




    mock.onPut('/api/v1/orders/1')
      .reply(200, {
        success: true,
        message: 'order updated successfully',
      });


    await store.dispatch(updateOrder(1, {}))

    expect(notify()).toEqual('toast called');

    done();
  });


  it('should dispatch `DELETE_ORDER_SUCCESS` on deleting order',
    async (done) => {
      const store = mockStore({orders: {
        history: orders
      }}); // mock store

      mock.onDelete('/api/v1/orders/1')
        .reply(204, {
          success: true,
          message: 'order deleted successfully',
        });

      const expectedAction = {
          type: DELETE_ORDER_SUCCESS,
          orderId: 1
        };


      await store.dispatch(deleteOrder(1))
      const actions = store.getActions();
      expect(actions[0]).toEqual(expectedAction);
      expect(actions[0].orderId).toEqual(1)

      done();
  });


  it('should dispatch `EMPTY_CART` on posting order', async (done) => {
    const store = mockStore(ordersDefaultState); // mock store

    mock.onPost('/api/v1/orders')
      .reply(201, {
        success: true,
        message: 'order posted successfully',
      });

    const expectedAction = {
        type: EMPTY_CART,
      };


    await store.dispatch(postOrder('isuti rd', orderMeals))
    const actions = store.getActions();
    expect(actions[0]).toEqual(expectedAction);
    expect(notify()).toEqual('toast called');

    done();
  });


  it('should dispatch `SET_EDIT_ORDER` when order is to be edited', (done) => {
    const expectedAction = {
        type: SET_EDIT_ORDER,
        editOrder: {
          orderId: 1,
          deliveryAddress: 'isuti rd',
          orderedMeals: orderMeals,
          totalPrice: 1100
        }
      };

    const action = setEditOrder({
      orderId: 1,
      deliveryAddress: 'isuti rd',
      orderedMeals: orderMeals,
      totalPrice: 1100
    });
    expect(action).toEqual(expectedAction);

    done();
  });


  it('should dispatch `DELETE_MEAL_IN_EDIT_ORDER` when editing order',
    (done) => {

      const store = mockStore({
        orders: {
          editOrder: {
            orderedMeals: [...orderMeals],
            totalPrice: 1100
          }
        }
      });


      const expectedAction = {
          type: DELETE_MEAL_IN_EDIT_ORDER,
          mealId: '4'
        };

      store.dispatch(deleteMealInEditOrder('4'));
      const actions = store.getActions();
      expect(actions[0]).toEqual(expectedAction);

      done();
  });


  it(
    'should dispatch `UPDATE_ORDERED_MEAL_PORTION` when order is to be edited',
    (done) => {
    const store = mockStore({
      orders: {
        editOrder: {
          orderedMeals: orderMeals
        }
      }
    });


    const expectedAction = {
        type: UPDATE_ORDERED_MEAL_PORTION,
        meal: {
          mealId: '4',
          portion: 2
        }
      };

    store.dispatch(updateOrderedMealPortion({ mealId: '4', portion: 2 }));
    const actions = store.getActions();
    expect(actions[0]).toEqual(expectedAction);

    done();
  });


  it('should dispatch `SET_ORDER_MEALS` on getting order meals',
    async (done) => {
      const store = mockStore({
        orders: {
          editOrder: {
            orderedMeals: orderMeals
          }
        }
      });

      mock.onGet('/api/v1/orders/1/meals?limit=5&offset=0')
        .reply(200, {
          success: true,
          order: [
            {
              Meals: orderMeals
            }
          ],
          pagination: {
            count: 5,
            numOfPages: 1,
            limit: 5,
            offset: 0
          }
        })


      const expectedAction = {
          type: SET_ORDER_MEALS,
          order: {
            orderedMeals: orderMeals,
            orderedMealsPagination: {
              count: 5,
              numOfPages: 1,
              limit: 5,
              offset: 0
            }
          }
        };

      await store.dispatch(
        getOrderMeals('/api/v1/orders/1/meals', {limit: 5, offset: 0 })
      );
      const actions = store.getActions();
      expect(actions[0]).toEqual(expectedAction);

      done();
  });

  it('should dispatch `SET_ORDERS` on getting all orders', async (done) => {
    const store = mockStore(ordersDefaultState); // mock store

    mock.onGet('/api/v1/orders?limit=10&offset=0')
      .reply(200, {
        success: true,
        grandTotalPrice: 1100,
        pagination,
        orders,
      });

    const expectedAction = {
      type: SET_ORDERS,
      orders: {
        history: orders,
        grandTotalPrice: 1100,
        pagination
      }
    };

    await store.dispatch(getOrders({}))
    const actions = store.getActions();
    expect(actions[0]).toEqual(expectedAction);
    expect(actions[0].orders.history).toHaveLength(3)

    done();
  });
});
