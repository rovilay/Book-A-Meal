import jest from 'jest';
import mockStore from '../__mockData__/mockStore';
import isExpired from '../../helpers/isExpired';
import { meals, cartWithMeals } from '../__mockData__/mealMock';
import {
  ADD_MEAL_TO_CART,
  UPDATE_CART_MEAL_PORTION,
  DELETE_MEAL_IN_CART,
  EMPTY_CART,
} from '../../actions/actiontypes';
import {
  emptyCart,
  addToCart,
  deleteMealInCart,
  updateCartMealPortion
} from '../../actions/cartActions';
import { cartDefaultState } from '../../reducers/cartReducer';

describe('Cart Actions test', () => {
  beforeEach((done) => {
    mock.reset();

    done()
  })
  afterAll((done) => {
    mock.reset();

    done()
  })

  it('should dispatch `ADD_MEAL_TO_CART` to store if meal not in store', (done) => {
    const store = mockStore({cart: cartDefaultState});

    const expectedAction = {
      type: ADD_MEAL_TO_CART,
      cart: {
        meals: [
          {
            ...meals[0],
            unitPrice: meals[0].price,
            price: meals[0].price * meals[0].portion
          }
        ],
        totalPrice: meals[0].price * meals[0].portion
      }
    };

    localStorage.setItem('jwt', customerToken)
    localStorage.getItem('jwt')
    store.dispatch(addToCart(meals[0]))
    const actions = store.getActions();
    expect(actions[0]).toEqual(expectedAction);

    done();
  });


  it('should notify if meal already in store', (done) => {
    const store = mockStore({cart: cartWithMeals});
    localStorage.setItem('jwt', customerToken)
    localStorage.getItem('jwt')

    store.dispatch(addToCart(meals[0]))

    expect(notify()).toEqual('toast called');

    done();
  });


  it('should dispatch `DELETE_MEAL_IN_CART` to store', (done) => {
    const store = mockStore({cart: cartWithMeals});

    const expectedAction = {
      type: DELETE_MEAL_IN_CART,
      modifiedCart: {
        meals: [],
        totalPrice: 0
      }
    };

    localStorage.setItem('jwt', customerToken)
    localStorage.getItem('jwt')

    store.dispatch(deleteMealInCart({ id: meals[0].id, price: 2000 }))

    const actions = store.getActions();
    expect(actions[0]).toEqual(expectedAction);

    done();
  });

  it('should dispatch `UPDATE_CART_MEAL_PORTION` to store', (done) => {
    const store = mockStore({ cart: cartWithMeals })

    const expectedAction = {
      type: UPDATE_CART_MEAL_PORTION,
      updatedCart: {
        totalPrice: 1000,
        meals: [
          {
            ...cartWithMeals.meals[0],
            portion: 1,
            unitPrice: 1000,
            price: 1000
          }
        ]
      }
    };

    localStorage.setItem('jwt', customerToken)
    localStorage.getItem('jwt')

    store.dispatch(updateCartMealPortion({ id: meals[0].id, portion: 1 }))

    const actions = store.getActions();
    expect(actions[0]).toEqual(expectedAction);

    done()
  })


  it('should dispatch `EMPTY_CART` to store', (done) => {
    const store = mockStore({cart: cartWithMeals});

    const expectedAction = {
      type: EMPTY_CART
    };

    localStorage.setItem('jwt', customerToken)
    localStorage.getItem('jwt')

    store.dispatch(emptyCart())

    const actions = store.getActions();
    expect(actions[0]).toEqual(expectedAction);

    done();
  });
});
