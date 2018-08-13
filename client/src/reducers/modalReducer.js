import {
  SET_MODAL,
  DELETE_MEAL_IN_EDIT_MODAL,
  ADD_MEAL_IN_EDIT_MENU_MODAL,
} from '../actions/actiontypes';

const modalDefaultState = {
  isOpen: false,
  isEdit: false,
  isInfo: false,
  isSetMenu: false,
  close: true,
  content: {},
  contentLabel: '',
  pagination: {
    limit: 10,
    offset: 0,
    numOfPages: 1
  }
};

const modalReducer = (state = modalDefaultState, action) => {
  switch (action.type) {
    case SET_MODAL:
      return {
        ...state,
        ...action.modal
      };
    case ADD_MEAL_IN_EDIT_MENU_MODAL:
      return {
        ...state,
        content: {
          ...state.content,
          meals: action.newMeals
        }
      };
    case DELETE_MEAL_IN_EDIT_MODAL:
      return {
        ...state,
        content: {
          ...state.content,
          ...action.newContent
        }
      };
    default:
      return state;
  }
};

export default modalReducer;
