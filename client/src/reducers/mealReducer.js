import {
  SET_MEAL_FOR_EDIT,
  REMOVE_MEAL_FROM_EDIT,
  SET_MEALS,
  SET_DEFAULT_MEAL_STATE,
  MEAL_ERROR
} from '../actions/actiontypes';

const setDefaultMealState = {
  meals: [],
  mealOnEdit: {},
  error: ''
};

const mealReducer = (state = setDefaultMealState, action) => {
  switch (action.type) {
    case SET_MEALS:
      return {
        ...state,
        meals: action.meals
      };
    case SET_DEFAULT_MEAL_STATE:
      return {
        ...setDefaultMealState
      };
    case SET_MEAL_FOR_EDIT:
      return {
        ...state,
        mealOnEdit: action.mealForEdit
      };
    case MEAL_ERROR:
      return {
        ...state,
        error: action.error
      };
    case REMOVE_MEAL_FROM_EDIT:
      return {
        ...state,
        mealOnEdit: {}
      };
    default:
      return state;
  }
};

export default mealReducer;
