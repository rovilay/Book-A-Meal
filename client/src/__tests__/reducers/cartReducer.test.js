import { cartDefaultState, cartReducer } from '../../reducers/cartReducer';
import {
  ADD_MEAL_TO_CART,
  UPDATE_CART_MEAL_PORTION,
  DELETE_MEAL_IN_CART
} from '../../actions/actiontypes';
import { emptyCart } from '../../actions/cartActions';
import { meals } from '../__mockData__/mealMock';


describe('Cart reducer', () => {
  it('should add meals to cart state', (done) => {
    const action = {
      type:  ADD_MEAL_TO_CART,
      meal: meals[0]
    };
    const newState = cartReducer(cartDefaultState, action);
    expect(newState).toEqual({
      meals: [
        {
          ...meals[0],
          price: 2000,
          unitPrice: 1000
        }
      ],
      totalPrice: 2000
    });

    done();
  });

  it('should notify if meal is already in cart to cart state', (done) => {
    const currentState = {
      ...cartDefaultState,
      meals: [meals[0]],
      totalPrice: 2000
    }
    const action = {
      type:  ADD_MEAL_TO_CART,
      meal: meals[0]
    };
    const newState = cartReducer(currentState, action);
    expect(newState).toEqual(currentState);

    done();
  });

  it('should delete meal from cart state', (done) => {
    const currentState = {
      meals,
      totalPrice: 4800
    };

    const action = {
      type: DELETE_MEAL_IN_CART,
      meal: {
        ...meals[3],
        price: 1000
      }
    };

    const newState = cartReducer(currentState, action);
    expect(newState.meals).toEqual(meals.slice(0, 3));
    expect(newState.totalPrice).toEqual(3800);

    done();
  });

  it('should update cart meals portion', (done) => {
    const currentState = {
      meals: [
        {
          ...meals[0],
          price: 2000,
          unitPrice: 1000
        }
      ],
      totalPrice: 2000
    }

    const action = {
      type: UPDATE_CART_MEAL_PORTION,
      meal: {
        id: meals[0].id,
        portion: 1
      }
    };

    const newState = cartReducer(currentState, action);
    expect(newState.meals[0]).toEqual({
      ...meals[0],
      unitPrice: 1000,
      portion: 1,
      price: 1000
    })

    done();
  });


  it('should empty cart', (done) => {
    const action = emptyCart();

    const newState = cartReducer(cartDefaultState, action);
    expect(newState).toEqual(cartDefaultState);

    done();
  });


  it('should return state for unknown action type', (done) => {
    const action = {
      type: undefined
    };
    const newState = cartReducer(cartDefaultState, action);
    expect(newState).toEqual(cartDefaultState);

    done();
  });
});
