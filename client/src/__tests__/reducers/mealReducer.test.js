import { mealDefaultState, mealReducer } from '../../reducers/mealReducer';
import {
  SET_MEALS,
  MEAL_ERROR,
  SET_MEAL_FOR_EDIT,
  UPDATE_MEAL_ON_EDIT
} from '../../actions/actiontypes';
import {
  setDefaultMealState,
  removeMealFromEdit
} from '../../actions/mealActions';
import { meals, pagination } from '../__mockData__/mealMock';


describe('Meal reducers', () => {
  it('should update state to default state', (done) => {
    const action = setDefaultMealState();
    const newState = mealReducer(mealDefaultState, action);
    expect(newState).toEqual(mealDefaultState);

    done();
  });


  it('should update state on `SET_MEALS` action', (done) => {
    const action = {
      type: SET_MEALS,
      meals,
      pagination
    };

    const newState = mealReducer(mealDefaultState, action);
    expect(newState.meals).toEqual(action.meals);
    expect(newState.pagination).toEqual(action.pagination);

    done();
  });


  it('should set meal for edit', (done) => {
    const action = {
      type: SET_MEAL_FOR_EDIT,
      mealForEdit: meals[0]
    };

    const newState = mealReducer(mealDefaultState, action);
    expect(newState.mealOnEdit).toEqual(meals[0]);

    done();
  });


  it('should update `mealOnEdit` state', (done) => {
    const action = {
      type: UPDATE_MEAL_ON_EDIT,
      updatedMeal: {
        ...meals[2]
      }
    }

    const newState = mealReducer(mealDefaultState, action);
    expect(newState.mealOnEdit).toEqual(meals[2]);

    done();
  });

  it('should remove meal from edit state', (done) => {
    const currentState = {
      ...mealDefaultState,
      mealOnEdit: meals[0]
    }
    const action = removeMealFromEdit();

    const newState = mealReducer(currentState, action);
    expect(newState).toEqual(mealDefaultState);

    done();
  });


  it('should update state to default state', (done) => {
    const action = {
      type: MEAL_ERROR,
      error: 'No meal found!'
    };

    const newState = mealReducer(mealDefaultState, action);
    expect(newState.error).toEqual(action.error);

    done();
  });


  it('should return default state for unknown action type', (done) => {
    const action = {
      type: undefined,
    }
    const newState = mealReducer(mealDefaultState, action);
    expect(newState).toEqual(mealDefaultState);

    done();
  });
});

