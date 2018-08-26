import { SET_FILTER } from '../actions/actiontypes';

export const filterDefaultState = {
  by: 'all',
  date: '',
  month: ''
};

export const filterReducer = (state = filterDefaultState, action) => {
  switch (action.type) {
    case SET_FILTER:
      return {
        ...state,
        ...action.filter
      };
    default:
      return state;
  }
};
