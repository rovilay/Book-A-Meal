import {
  SET_MODAL
} from '../actions/actiontypes';

export const modalDefaultState = {
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

export const modalReducer = (state = modalDefaultState, action) => {
  switch (action.type) {
    case SET_MODAL:
      return {
        ...state,
        ...action.modal
      };
    default:
      return state;
  }
};
