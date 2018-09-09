import {
  SET_MEAL_FOR_EDIT,
  REMOVE_MEAL_FROM_EDIT,
  SET_MEALS,
  UPDATE_MEAL_ON_EDIT,
  SET_DEFAULT_MEAL_STATE,
  MEAL_ERROR,
  DELETE_MEAL,
  ADD_MEAL,
  UPDATE_MEAL
} from '../actions/actiontypes';
import * as helpers from '../helpers/reducers-helpers/meals-helpers';


export const mealDefaultState = {
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

export const mealReducer = (state = mealDefaultState, action) => {
  switch (action.type) {
    case SET_MEALS:
      return {
        ...state,
        meals: action.meals,
        pagination: action.pagination
      };
    case DELETE_MEAL:
      return {
        ...state,
        meals: state.meals.filter(meal => meal.id !== action.mealId),
        pagination: {
          ...state.pagination,
          count: state.pagination.count - 1
        }
      };
    case ADD_MEAL:
      return helpers.addMeal(state, action.meal);
    case UPDATE_MEAL:
      return helpers.updateMeal(state, action.meal);
    case SET_DEFAULT_MEAL_STATE:
      return {
        ...mealDefaultState
      };
    case SET_MEAL_FOR_EDIT:
      return {
        ...state,
        mealOnEdit: {
          ...state.meals.filter(meal => meal.id === action.mealId)[0]
        }
      };
    case MEAL_ERROR:
      return {
        ...state,
        error: action.error
      };
    case UPDATE_MEAL_ON_EDIT:
      return {
        ...state,
        mealOnEdit: {
          ...state.mealOnEdit,
          ...action.mealUpdate
        }
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
