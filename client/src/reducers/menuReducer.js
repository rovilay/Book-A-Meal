import {
  SET_TODAY_MENU,
  SET_ALL_MENUS,
  SET_MENU_MEALS,
  ADD_MEAL_TO_NEW_MENU,
  REMOVE_MEAL_FROM_NEW_MENU,
  DELETE_MEAL_IN_EDIT_MENU,
  DELETE_MEAL_IN_MENU,
  EMPTY_NEW_MENU,
  ADD_MEAL_IN_EDIT_MENU,
  EMPTY_EDIT_MENU,
  SET_MENU_FOR_EDIT
} from '../actions/actiontypes';

export const menuDefaultState = {
  todayMenu: [],
  newMenu: [],
  allMenus: [],
  menuMeals: {
    meals: [],
    pagination: {
      limit: 5,
      offset: 0,
      count: 0,
      numOfPages: 1
    }
  },
  editMenu: [],
  pagination: {
    limit: 10,
    offset: 0,
    count: 0,
    numOfPages: 1
  }
};

export const menuReducer = (state = menuDefaultState, action) => {
  switch (action.type) {
    case SET_TODAY_MENU:
      return {
        ...state,
        todayMenu: action.meals,
        pagination: action.pagination

      };
    case ADD_MEAL_TO_NEW_MENU:
      return {
        ...state,
        newMenu: [...new Set([...state.newMenu, action.mealId])]
      };
    case REMOVE_MEAL_FROM_NEW_MENU:
      return {
        ...state,
        newMenu: state.newMenu.filter(mealId => mealId !== action.mealId)
      };
    case EMPTY_NEW_MENU:
      return {
        ...state,
        newMenu: []
      };
    case SET_ALL_MENUS:
      return {
        ...state,
        allMenus: action.menus,
        pagination: action.pagination
      };
    case SET_MENU_MEALS:
      return {
        ...state,
        menuMeals: action.menuMeals,
        menuMealsPagination: action.pagination
      };
    case DELETE_MEAL_IN_MENU:
      return {
        ...state,
        menuMeals: {
          meals: [...state.menuMeals.meals].filter(
            meal => meal.id !== action.mealId
          ),
          pagination: {
            ...state.menuMeals.pagination,
            count: state.menuMeals.pagination.count - 1
          }
        }
      };
    case SET_MENU_FOR_EDIT:
      return {
        ...state,
        editMenu: action.editMenu
      };
    case ADD_MEAL_IN_EDIT_MENU:
      return {
        ...state,
        editMenu: [...new Set([...state.editMenu, action.mealId])]
      };
    case DELETE_MEAL_IN_EDIT_MENU:
      return {
        ...state,
        editMenu: [
          ...state.editMenu.filter(mealId => mealId !== action.mealId)
        ]
      };
    case EMPTY_EDIT_MENU:
      return {
        ...state,
        editMenu: []
      };
    default:
      return state;
  }
};
