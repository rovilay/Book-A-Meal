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
      cart: {
        meals,
        totalPrice: 4200
      }
    };
    const newState = cartReducer(cartDefaultState, action);
    expect(newState).toEqual({
      meals,
      totalPrice: 4200
    });

    done();
  });

  it('should remove meals from cart state', (done) => {
    const currentState = {
      meals,
      totalPrice: 4200
    };

    const action = {
      type: DELETE_MEAL_IN_CART,
      modifiedCart: {
        meals: meals.slice(0, 2),
        totalPrice: 3200
      }
    };

    const newState = cartReducer(currentState, action);
    expect(newState.meals).toEqual(meals.slice(0, 2));
    expect(newState.totalPrice).toEqual(3200);

    done();
  });

  it('should update cart meals portion', (done) => {
    const currentState = {
      meals: [meals[0]],
      totalPrice: 2000
    }

    const action = {
      type: UPDATE_CART_MEAL_PORTION,
      updatedCart: {
        totalPrice: 1000,
        meals: [
          {
          ...meals[0],
          portion: 1,
          price: 1000
        }
      ]}
    };

    const newState = cartReducer(currentState, action);
    expect(newState.meals[0]).toEqual({
      ...meals[0],
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
