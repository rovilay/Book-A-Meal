const setDefaultMenuState = {
  gotMenu: false,
  message: '',
  Meals: []
};

const menuReducer = (state = setDefaultMenuState, action) => {
  switch (action.type) {
    case 'SET_TODAY_MENU':
      return {
        ...action.menu
      };
    default:
      return state;
  }
};

export default menuReducer;
