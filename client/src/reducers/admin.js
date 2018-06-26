import filterify from '../helpers/filter';

const setDefaultAdminState = {
  meals: [],
  filteredMeals: [],
  setMenuMeals: [],
  editMenuMeals: [],
  menus: [],
  orders: {
    grandTotalPrice: 0,
    history: []
  },
  serverRes: {
    success: '',
    message: ''
  },
  mealOnEdit: {},
  modal: {
    isOpen: false,
    isEdit: false,
    isInfo: false,
    isOrderInfo: false,
    isSetMenu: false,
    close: true,
    content: {},
    contentLable: ''
  }
};

const adminReducer = (state = setDefaultAdminState, action) => {
  switch (action.type) {
    case 'SET_MEALS':
      return {
        ...state,
        meals: [...action.meals]
      };
    case 'SET_ADMIN_MODAL':
      return {
        ...state,
        modal: {
          ...action.modal
        }
      };
    case 'ADD_MEAL_NEW_MENU':
      return {
        ...state,
        setMenuMeals: [...new Set([
          ...state.setMenuMeals,
          action.mealId
        ])]
      };
    case 'REMOVE_MEAL_NEW_MENU':
      return {
        ...state,
        setMenuMeals: [
          ...state.setMenuMeals.filter(id => id !== action.mealId)
        ]
      };
    case 'EMPTY_NEW_MENU':
      return {
        ...state,
        setMenuMeals: []
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
    case 'RESET_SERVER_RES':
      return {
        ...state,
        serverRes: {
          success: '',
          message: ''
        }
      };
    case 'ADD_MEAL_EDIT_MENU':
      return {
        ...state,
        editMenuMeals: [
          ...new Set([
            ...state.editMenuMeals,
            action.mealId
          ])
        ]
      };
    case 'DELETE_MEAL_EDIT_MENU':
      return {
        ...state,
        editMenuMeals: [
          ...state.editMenuMeals.filter(id => id !== action.mealId)
        ]
      };
    case 'EMPTY_EDIT_MENU':
      return {
        ...state,
        editMenuMeals: []
      };
    case 'DELETE_MEAL_EDIT_MODAL':
      return {
        ...state,
        modal: {
          ...state.modal,
          content: {
            ...state.modal.content,
            meals: [
              ...state.modal.content.meals.filter(meal => meal.id !== action.mealId)
            ]
          }
        }
      };
    case 'SET_MEAL_FOR_EDIT':
      return {
        ...state,
        mealOnEdit: state.meals.filter(meal => meal.id === action.mealId)[0]
      };
    case 'REMOVE_MEAL_FROM_EDIT':
      return {
        ...state,
        mealOnEdit: {}
      };
    case 'SET_ORDERS':
      return {
        ...state,
        orders: {
          ...action.orders
        }
      };
    case 'FILTER_CATERER_MEALS':
      return {
        ...state,
        filteredMeals: filterify(action.filter, state.meals)
      };
    default:
      return state;
  }
};

export default adminReducer;

