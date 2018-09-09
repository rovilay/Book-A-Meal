import { mealDefaultState, mealReducer } from '../../reducers/mealReducer';
import {
  SET_MEALS,
  MEAL_ERROR,
  SET_MEAL_FOR_EDIT,
  UPDATE_MEAL_ON_EDIT,
  UPDATE_MEAL,
  DELETE_MEAL,
  ADD_MEAL
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


  it('should add meals to state on `SET_MEALS` action', (done) => {
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

  it('should add meal in meals state on `ADD_MEAL` action', (done) => {
    const currentState = {
      ...mealDefaultState,
      meals
    };

    const action = {
      type: ADD_MEAL,
      meal: {
        ...meals[0],
        title: 'APU'
      }
    };

    const newState = mealReducer(currentState, action);
    expect(newState.meals[0]).toEqual({
      ...meals[0],
      title: 'APU'
    });
    expect(newState.meals).toEqual([
      {
      ...meals[0],
      title: 'APU'
      },
      ...meals
    ]);

    done();
  });
  it('should update meal in meals state on `UPDATE_MEAL` action', (done) => {
    const currentState = {
      ...mealDefaultState,
      meals
    };

    const action = {
      type: UPDATE_MEAL,
      meal: {
        ...meals[0],
        title: 'EBA'

      }
    };

    const newState = mealReducer(currentState, action);
    expect(newState.meals[0]).toEqual({
      ...meals[0],
      title: 'EBA'
    });

    done();
  });


  it('should delete meal in meals state on `DELETE_MEAL` action', (done) => {
    const currentState = {
      ...mealDefaultState,
      meals
    };

    const action = {
      type: DELETE_MEAL,
      mealId: meals[3].id
    };

    const newState = mealReducer(currentState, action);
    expect(newState.meals).toEqual(meals.slice(0, 3));

    done();
  });


  it('should set meal for edit', (done) => {
    const currentState = {
      ...mealDefaultState,
      meals
    }

    const action = {
      type: SET_MEAL_FOR_EDIT,
      mealId: meals[0].id
    };

    const newState = mealReducer(currentState, action);
    expect(newState.mealOnEdit).toEqual(meals[0]);

    done();
  });


  it('should update `mealOnEdit` state', (done) => {
    const action = {
      type: UPDATE_MEAL_ON_EDIT,
      mealUpdate: {
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

