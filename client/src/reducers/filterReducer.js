import { SET_FILTER } from '../actions/actiontypes';

const setDefaultFilterState = {
  by: 'all',
  date: '',
  month: ''
};

const filterReducer = (state = setDefaultFilterState, action) => {
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

export default filterReducer;
