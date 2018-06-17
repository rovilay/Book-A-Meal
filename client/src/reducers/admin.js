const setDefaultAdminState = {
  meals: [],
  setMenuMeals: [],
  serverRes: {},
  menus: []
};

const adminReducer = (state = setDefaultAdminState, action) => {
  switch (action.type) {
    case 'SET_MEALS':
      return {
        ...state,
        meals: [...action.meals]
      };
    case 'SET_NEW_MENU':
      return {
        ...state,
        setMenuMeals: [
          ...state.setMenuMeals,
          action.mealId
        ]
      };
    case 'SET_MENUS':
      return {
        ...state,
        menus: [
          ...action.menus,
        ]
      };
    case 'SET_DEFAULT':
      return {
        ...setDefaultAdminState
      };
    case 'SERVER_RES':
      return {
        ...state,
        serverRes: { ...action.response }
      };
    default:
      return state;
  }
};

export default adminReducer;
