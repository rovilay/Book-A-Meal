import {
  SET_TODAY_MENU,
  SET_ALL_MENUS,
  ADD_MEAL_TO_NEW_MENU,
  REMOVE_MEAL_FROM_NEW_MENU,
  DELETE_MEAL_IN_EDIT_MENU,
  EMPTY_NEW_MENU,
  ADD_MEAL_IN_EDIT_MENU,
  EMPTY_EDIT_MENU,
  SET_MENU_FOR_EDIT
} from '../actions/actiontypes';

const setDefaultMenuState = {
  todayMenu: [],
  newMenu: [],
  allMenus: [],
  editMenu: []
};

const menuReducer = (state = setDefaultMenuState, action) => {
  switch (action.type) {
    case SET_TODAY_MENU:
      return {
        ...state,
        todayMenu: action.menu
      };
    case ADD_MEAL_TO_NEW_MENU:
      return {
        ...state,
        newMenu: action.newMenu
      };
    case REMOVE_MEAL_FROM_NEW_MENU:
      return {
        ...state,
        newMenu: action.newMenu
      };
    case EMPTY_NEW_MENU:
      return {
        ...state,
        newMenu: []
      };
    case SET_ALL_MENUS:
      return {
        ...state,
        allMenus: action.menus
      };
    case SET_MENU_FOR_EDIT:
      return {
        ...state,
        editMenu: action.editMenu
      };
    case ADD_MEAL_IN_EDIT_MENU:
      return {
        ...state,
        editMenu: action.editMenu
      };
    case DELETE_MEAL_IN_EDIT_MENU:
      return {
        ...state,
        editMenu: action.editMenu
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

export default menuReducer;
