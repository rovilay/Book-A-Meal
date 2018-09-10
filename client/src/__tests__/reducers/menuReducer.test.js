import { menuDefaultState, menuReducer } from '../../reducers/menuReducer';
import {
  ADD_MEAL_TO_NEW_MENU,
  REMOVE_MEAL_FROM_NEW_MENU,
  ADD_MEAL_IN_EDIT_MENU,
  DELETE_MEAL_IN_EDIT_MENU,
  DELETE_MEAL_IN_MENU,
  SET_MENU_FOR_EDIT,
  SET_ALL_MENUS,
  SET_MENU_MEALS,
  SET_TODAY_MENU
} from '../../actions/actiontypes';
import {
  emptyNewMenu,
  emptyEditMenu
} from '../../actions/menuActions';
import { menus, pagination, menuMeals } from '../__mockData__/menuMock';


describe('Menus reducers', () => {
  it('should add all menus to state', (done) => {
    const action = {
      type: SET_ALL_MENUS,
      menus,
      pagination
    };
    const newState = menuReducer(menuDefaultState, action);
    expect(newState.allMenus).toEqual(menus);
    expect(newState.pagination).toEqual(pagination);

    done();
  });


  it('should add `menuMeals` to state', (done) => {
    const action = {
      type: SET_MENU_MEALS,
      menuMeals: {
        meals: [...menuMeals.map(meal => meal.id)],
        pagination: {
          count: 4,
          numOfPages: 1,
          limit: 5,
          offset: 0
        }
      }
    };
    const newState = menuReducer(menuDefaultState, action);
    expect(newState.menuMeals).toEqual({
      meals:  ['1', '2', '3', '4'],
      pagination: {
        count: 4,
        numOfPages: 1,
        limit: 5,
        offset: 0
      }
    });

    done();
  });


  it('should remove meal from `menu`', (done) => {
    const currentState = {
      ...menuDefaultState,
      menuMeals: {
        meals: menuMeals,
        pagination: {
          count: 4,
          numOfPages: 1,
          limit: 5,
          offset: 0
        }
      }
    }

    const action = {
      type: DELETE_MEAL_IN_MENU,
      mealId: '4'
    };

    const newState = menuReducer(currentState, action);
    expect(newState.menuMeals).toEqual({
      meals: menuMeals.slice(0, 3),
      pagination: {
        count: 3,
        numOfPages: 1,
        limit: 5,
        offset: 0
      }
    });

    done();
  });


  it('should add meal to `newMenu` state', (done) => {
    const action = {
      type: ADD_MEAL_TO_NEW_MENU,
      mealId: '1'
    };
    const newState = menuReducer(menuDefaultState, action);
    expect(newState.newMenu).toEqual(['1']);

    done();
  });


  it('should remove meal from `newMenu` state', (done) => {
    const currentState = {
      ...menuDefaultState,
      newMenu: ['1', '2', '3']
    };

    const action = {
      type: REMOVE_MEAL_FROM_NEW_MENU,
      mealId: '2'
    };
    const newState = menuReducer(currentState, action);
    expect(newState.newMenu).toEqual(['1', '3']);

    done();
  });


  it('should empty `newMenu` state', (done) => {
    const currentState = {
      ...menuDefaultState,
      newMenu: ['1', '2', '3']
    };
    const action = emptyNewMenu();
    const newState = menuReducer(currentState, action);
    expect(newState.newMenu).toEqual([]);

    done();
  });

  it('should add menu to edit state', (done) => {
    const action = {
      type: SET_MENU_FOR_EDIT,
      editMenu: [...menuMeals.map(meal => meal.id)]
    };
    const newState = menuReducer(menuDefaultState, action);
    expect(newState.editMenu).toEqual(['1', '2', '3', '4']);

    done();
  });

  it('should add meal to `editMenu` state', (done) => {
    const action = {
      type: ADD_MEAL_IN_EDIT_MENU,
      mealId: '1'
    };
    const newState = menuReducer(menuDefaultState, action);
    expect(newState.editMenu).toEqual(['1']);

    done();
  });


  it('should delete meal from `editMenu` state', (done) => {
    const currentState = {
      ...menuDefaultState,
      editMenu: ['1', '2', '3']
    };

    const action = {
      type: DELETE_MEAL_IN_EDIT_MENU,
      mealId: '3'
    };
    const newState = menuReducer(currentState, action);
    expect(newState.editMenu).toEqual(['1', '2']);

    done();
  });


  it('should empty `editMenu` state', (done) => {
    const currentState = {
      ...menuDefaultState,
      editMenu: ['1', '2', '3']
    };
    const action = emptyEditMenu();
    const newState = menuReducer(currentState, action);
    expect(newState.editMenu).toEqual([]);

    done();
  });


  it('should set  `todayMenu` state', (done) => {
    const action = {
      type: SET_TODAY_MENU,
      meals: menuMeals,
      pagination: {
        ...pagination,
        count: 4
      }
    };
    const newState = menuReducer(menuDefaultState, action);
    expect(newState.todayMenu).toEqual(menuMeals);
    expect(newState.pagination).toEqual({
      ...pagination,
      count: 4
    });

    done();
  });


  it('should return state for unknown action type', (done) => {
    const action = {
      type: undefined
    };
    const newState = menuReducer(menuDefaultState, action);
    expect(newState).toEqual(menuDefaultState);

    done();
  });
});
