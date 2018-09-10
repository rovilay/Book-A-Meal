import mockStore from '../__mockData__/mockStore';
import notify from '../../helpers/notify';
import {
  pagination
} from '../__mockData__/mealMock';
import {
  menus,
  menuMeals
} from '../__mockData__/menuMock';
import {
  SET_TODAY_MENU,
  SET_ALL_MENUS,
  SET_MENU_MEALS,
  ADD_MEAL_TO_NEW_MENU,
  REMOVE_MEAL_FROM_NEW_MENU,
  DELETE_MEAL_IN_EDIT_MENU,
  DELETE_MEAL_IN_MENU,
  EMPTY_NEW_MENU,
  ADD_MEAL_IN_EDIT_MENU,
  EMPTY_EDIT_MENU,
  SET_MENU_FOR_EDIT
} from '../../actions/actiontypes';
import {
  setMenuForEdit,
  addMealToNewMenu,
  removeMealFromNewMenu,
  emptyNewMenu,
  addMealInEditMenu,
  deleteMealInEditMenu,
  deleteMealInMenu,
  getAllMenus,
  getMenuMeals,
  getTodayMenu,
  postMenu,
  updateMenu,
  deleteMenuMeal
} from '../../actions/menuActions';
import { menuDefaultState } from '../../reducers/menuReducer';


describe('Menu Actions test', () => {
  beforeEach(() => { mock.reset(); });


  it('should dispatch `SET_ALL_MENUS` on getting all menus', (done) => {
    const store = mockStore(menuDefaultState); // mock store

    mock.onGet('/api/v1/menus?limit=10&offset=0')
      .reply(200, {
        success: true,
        menus: menus.reverse(),
        pagination
      });

    const expectedAction = {
      type: SET_ALL_MENUS,
      pagination,
      menus: menus.reverse()
    };

    localStorage.setItem('jwt', adminToken);

    store.dispatch(getAllMenus({}))
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual(expectedAction);
        expect(actions[0].menus).toHaveLength(4);
      })
      .catch(err => done(err));

    done();
  });


  it('should dispatch `SET_TODAY_MENUS` on getting all menus', (done) => {
    const store = mockStore(menuDefaultState); // mock store

    mock.onGet('/api/v1/menus/today?limit=12&offset=0')
      .reply(200, {
        success: true,
        menu: [
          {
            Meals: menuMeals,
          }
        ],
        pagination
      });

    const expectedAction = {
      type: SET_TODAY_MENU,
      pagination,
      meals: menuMeals,
    };

    localStorage.setItem('jwt', adminToken);

    store.dispatch(getTodayMenu({}))
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual(expectedAction);
        expect(actions[0].meals).toHaveLength(4);
      })
      .catch(err => done(err));

    done();
  });

  it('should dispatch `SET_ALL_MENUS` on posting new menu', async (done) => {
    const store = mockStore(menuDefaultState); // mock store

    mock.onPost('/api/v1/menus')
      .reply(201, {
        success: true,
        message: 'menu posted successfully '
      });

    mock.reset();

    localStorage.setItem('jwt', adminToken);

    await store.dispatch(postMenu({ postOn: '27-08-09', meals: menuMeals }));

    const actions = store.getActions();
    expect(notify()).toEqual('toast called');

    done();
  });

  it('should dispatch `SET_MENU_MEALS` getting menu meals', async (done) => {
    const store = mockStore(menuDefaultState);

    mock.onGet('/api/v1/menus/2/meals?limit=5&offset=0')
      .reply(200, {
        success: true,
        menu: [
          {
            Meals: menuMeals,
          }
        ],
        pagination: {
          limit: 5,
          offset: 0,
          count: 4,
          numOfPages: 1
        }
      });

    const expectedAction = {
      type: SET_MENU_MEALS,
      menuMeals: {
        meals: menuMeals,
        pagination: {
          limit: 5,
          offset: 0,
          count: 4,
          numOfPages: 1
        }
      }
    };

    localStorage.setItem('jwt', adminToken);

    await store.dispatch(
      getMenuMeals('/api/v1/menus/2/meals', { limit: 5, offset: 0 })
    );

    const actions = store.getActions();
    expect(actions[0]).toEqual(expectedAction);

    done();
  });


  it('should dispatch ` EMPTY_EDIT_MENU` on menu update', async (done) => {
    const store = mockStore(menuDefaultState);
    mock.onPost('/api/v1/menus/1/meals')
      .reply(201, {
        success: true,
        message: 'menu updated successfully'
      });

    mock.onGet('/api/v1/menus/1/meals?limit=5&offset=0')
      .reply(200, {
        success: true,
        menu: [
          {
            Meals: menuMeals,
          }
        ],
        pagination: {
          limit: 5,
          offset: 0,
          count: 4,
          numOfPages: 1
        }
      });

    const expectedAction = {
      type: EMPTY_EDIT_MENU,
    };

    localStorage.setItem('jwt', adminToken);

    await store.dispatch(updateMenu({ menuId: 1, meals: menuMeals }));

    const actions = store.getActions();
    expect(actions[0]).toEqual(expectedAction);
    expect(notify()).toEqual('toast called');

    done();
  });

  it('should dispatch ` EMPTY_EDIT_MENU` on deleting meals to menu',
    async (done) => {
      const store = mockStore(menuDefaultState);
      mock.onDelete('/api/v1/menus/1/meals')
        .reply(200, {
          success: true,
          message: 'meals deleted successfully'
        });

      const expectedAction = {
        type: EMPTY_EDIT_MENU,
      };

      localStorage.setItem('jwt', adminToken);

      await store.dispatch(deleteMenuMeal({
        mealUrl: '/api/v1/menus/1/meals',
        meals: menuMeals
      }));

      const actions = store.getActions();
      expect(actions[0]).toEqual(expectedAction);
      expect(notify()).toEqual('toast called');

      done();
    });

  it('should dispatch `SET_MENU_FOR_EDIT`', (done) => {
    const store = mockStore(menuDefaultState);
    const expectedAction = {
      type: SET_MENU_FOR_EDIT,
      editMenu: ['1', '2', '3', '4']
    };


    store.dispatch(setMenuForEdit(menuMeals));

    const actions = store.getActions();
    expect(actions[0]).toEqual(expectedAction);

    done();
  });


  it('should dispatch `ADD_MEAL_TO_NEW_MENU`', (done) => {
    const store = mockStore({ menu: menuDefaultState });
    const expectedAction = {
      type: ADD_MEAL_TO_NEW_MENU,
      mealId: '1'
    };


    store.dispatch(addMealToNewMenu('1'));

    const actions = store.getActions();
    expect(actions[0]).toEqual(expectedAction);

    done();
  });


  it('should dispatch `ADD_MEAL_IN_EDIT_MENU`', (done) => {
    const store = mockStore({ menu: menuDefaultState });
    const expectedAction = {
      type: ADD_MEAL_IN_EDIT_MENU,
      mealId: '1'
    };


    store.dispatch(addMealInEditMenu('1'));

    const actions = store.getActions();
    expect(actions[0]).toEqual(expectedAction);

    done();
  });

  it('should dispatch `DELETE_MEAL_IN_EDIT_MENU`', (done) => {
    const store = mockStore({
      menu: {
        editMenu: ['1', '2']
      }
    });
    const expectedAction = {
      type: DELETE_MEAL_IN_EDIT_MENU,
      mealId: '2'
    };


    store.dispatch(deleteMealInEditMenu('2'));

    const actions = store.getActions();
    expect(actions[0]).toEqual(expectedAction);

    done();
  });


  it('should dispatch `REMOVE_MEAL_FROM_NEW_MENU`', (done) => {
    const store = mockStore({
      menu: {
        newMenu: ['1', '2']
      }
    });
    const expectedAction = {
      type: REMOVE_MEAL_FROM_NEW_MENU,
      mealId: '2'
    };


    store.dispatch(removeMealFromNewMenu('2'));

    const actions = store.getActions();
    expect(actions[0]).toEqual(expectedAction);

    done();
  });


  it('should dispatch ` EMPTY_NEW_MENU`', (done) => {
    const expectedAction = {
      type: EMPTY_NEW_MENU,
    };

    const action = emptyNewMenu();
    expect(action).toEqual(expectedAction);

    done();
  });


  it('should dispatch `DELETE_MEAL_IN_MENU`', (done) => {
    const store = mockStore({
      menu: {
        menuMeals: {
          meals: menuMeals,
          pagination: {
            limit: 5,
            offset: 0,
            count: 4,
            numOfPages: 1
          }
        }
      }
    });

    const expectedAction = {
      type: DELETE_MEAL_IN_MENU,
      mealId: '1'
    };


    store.dispatch(deleteMealInMenu('1'));

    const actions = store.getActions();
    expect(actions[0]).toEqual(expectedAction);

    done();
  });
});
