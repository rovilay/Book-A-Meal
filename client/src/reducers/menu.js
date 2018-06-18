const setDefaultMenuState = {
  gotMenu: false,
  message: '',
  Meals: [],
  setMenuMeals: null
};

const menuReducer = (state = setDefaultMenuState, action) => {
  switch (action.type) {
    case 'SET_TODAY_MENU':
      return {
        ...state,
        ...action.menu
      };
    default:
      return state;
  }
};

export default menuReducer;
