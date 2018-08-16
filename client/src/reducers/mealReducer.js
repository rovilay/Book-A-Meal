import {
  SET_MEAL_FOR_EDIT,
  REMOVE_MEAL_FROM_EDIT,
  SET_MEALS,
  UPDATE_MEAL_ON_EDIT,
  SET_DEFAULT_MEAL_STATE,
  MEAL_ERROR
} from '../actions/actiontypes';

const setDefaultMealState = {
  meals: [],
  mealOnEdit: {},
  error: '',
  pagination: {
    limit: 12,
    offset: 0,
    count: 0,
    numOfPages: 1
  }
};

const mealReducer = (state = setDefaultMealState, action) => {
  switch (action.type) {
    case SET_MEALS:
      return {
        ...state,
        meals: action.meals,
        pagination: action.pagination
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
    case UPDATE_MEAL_ON_EDIT:
      return {
        ...state,
        mealOnEdit: action.updatedMeal
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
