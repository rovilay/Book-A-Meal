import mockStore from '../__mockData__/mockStore';
import {
  meals,
  pagination,
  mealDeleteResponse,
  mealUpdate,
  updatedMeals,
  newMeal
} from '../__mockData__/mealMock';
import {
  SET_MEAL_FOR_EDIT,
  REMOVE_MEAL_FROM_EDIT,
  SET_MEALS,
  UPDATE_MEAL_ON_EDIT,
  SET_DEFAULT_MEAL_STATE,
 } from '../../actions/actiontypes';
import {
  setMealForEdit,
  setDefaultMealState,
  removeMealFromEdit,
  updateMealOnEdit,
  getMeals,
  deleteMeal,
  postMeal,
  updateMeal
} from '../../actions/mealActions';
import { mealDefaultState } from '../../reducers/mealReducer';


describe('Meal Actions test', () => {
  beforeEach(() => { mock.reset(); });


  it('should dispatch `SET_MEALS` on getting meals', (done) => {
    const store = mockStore(mealDefaultState); // mock store

    mock.onGet('/api/v1/meals?limit=12&offset=0')
      .reply(200, {
        success: true,
        meals,
        pagination
      });

    const expectedAction = {
      type: SET_MEALS,
      pagination,
      meals
    };

    localStorage.setItem('jwt', adminToken);

    store.dispatch(getMeals({}))
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual(expectedAction);
        expect(actions[0].meals).toHaveLength(4)
      })
      .catch(err => done(err))

      done();
  });


  it('should dispatch `SET_MEALS` on deleting meal', (done) => {
    const store = mockStore({
      meal: {
      meals,
      pagination
    }}); // mock store

    mock.onDelete(`/api/v1/meals/959f0675-0ad3-47b7-8401-ec9e10bc1863`)
      .reply(204);

    const expectedAction = {
      type: SET_MEALS,
      ...mealDeleteResponse,
    };

    localStorage.setItem('jwt', adminToken);
    store.dispatch(deleteMeal('959f0675-0ad3-47b7-8401-ec9e10bc1863'))
      .then(() => {
        const actions = store.getActions();
        expect(actions[0].meals).toEqual(expectedAction.meals);
        expect(actions[0].type).toEqual(expectedAction.type);
      })
      .catch(err => done(err))

      done();
  });


  it('should dispatch `SET_MEALS` on posting new meal', (done) => {
    const store = mockStore({
      meal: {
      meals,
      pagination
    }}); // mock store

    mock.onPost('/api/v1/meals')
      .reply(200, {
        success: true,
        message: 'meal added successfully',
        meal: newMeal
      });

    const expectedAction = {
      type: SET_MEALS,
      meals: [
        ...meals,
        newMeal
      ],
      pagination
    };

    localStorage.setItem('jwt', customerToken);
    store.dispatch(postMeal(newMeal))
      .then(() => {
        const actions = store.getActions();

        expect(actions[0]).toEqual(expectedAction);
        expect(actions[0].meals.length).toBe(5);
      })
      .catch(err => done(err))

      done();
  });


  it('should notify error on post meal error response', async (done) => {
    const store = mockStore({
      meal: {
      meals,
      pagination
    }}); // mock store

    mock.onPost('/api/v1/meals')
      .reply(400, {
        success: false,
        message: 'error occured while posting meals!',
        meal: newMeal
      });


    localStorage.setItem('jwt', customerToken);
    await store.dispatch(postMeal(newMeal))
     expect(notify()).toEqual('toast called')

      done();
  });


  it('should notify error on update meal error response', async (done) => {
    const store = mockStore({
      meal: {
      meals,
      pagination
    }}); // mock store

    mock.onPut('/api/v1/meals')
      .reply(400, {
        success: false,
        message: 'meal not found!',
        meal: newMeal
      });


    localStorage.setItem('jwt', customerToken);
    await store.dispatch(updateMeal({
      mealId: '959f0675-0ad3-47b7-8401-ec9e10bc1863',
      data: mealUpdate
    }))
     expect(notify()).toEqual('toast called')

      done();
  });


  it('should dispatch `SET_MEALS` on updating meal', (done) => {
    const store = mockStore({
      meal: {
      meals,
      pagination
    }}); // mock store

    mock.onPut(`/api/v1/meals/959f0675-0ad3-47b7-8401-ec9e10bc1863`)
      .reply(200, {
        success: true,
        message: 'update successful'
      });

    const expectedAction = {
      type: SET_MEALS,
      meals: updatedMeals,
      pagination
    };

    localStorage.setItem('jwt', customerToken);
    store.dispatch(updateMeal({
      mealId: '959f0675-0ad3-47b7-8401-ec9e10bc1863',
      data: mealUpdate
    }))
      .then(() => {
        const actions = store.getActions();

        expect(actions[0]).toEqual(expectedAction);
      })
      .catch(err => done(err))

      done();
  });

  it('should dispatch `REMOVE_MEAL_FROM_EDIT`', (done) => {
    const action = removeMealFromEdit();
    expect(action).toEqual({
      type: REMOVE_MEAL_FROM_EDIT
    });

    done();
  });

  it('should dispatch `SET_MEAL_FOR_EDIT`', (done) => {
    const store = mockStore({
      meal: {
      meals,
      pagination
    }});

    const expectedAction = {
      type: SET_MEAL_FOR_EDIT,
      mealForEdit: {
        ...meals[3]
      }
    };

    store.dispatch(setMealForEdit('959f0675-0ad3-47b7-8401-ec9e10bc1863'));
    const actions = store.getActions();
    expect(actions[0].mealForEdit).toEqual(expectedAction.mealForEdit);
    expect(actions[0].type).toEqual(expectedAction.type);

    done();
  });

  it('should dispatch `UPDATE_MEAL_ON_EDIT`', (done) => {
    const store = mockStore({
      meal: {
      mealOnEdit: {
        id: '22',
        title: 'RICE AND BEANS',
        description: 'So sweet',
        price: 300
      }
    }});

    const expectedAction = {
      type: UPDATE_MEAL_ON_EDIT,
      updatedMeal: {
        id: '22',
        title: 'RICE AND BEANS',
        description: 'so delicious',
        price: 800
      }
    };

    store.dispatch(updateMealOnEdit(mealUpdate));
    const actions = store.getActions();
    expect(actions[0]).toEqual(expectedAction);

    done();
  });


  it('should dispatch `SET_DEFAULT_MEAL_STATE`', (done) => {
    const expectedAction = {
      type: SET_DEFAULT_MEAL_STATE,
    };

    const action = setDefaultMealState();
    expect(action).toEqual(expectedAction);

    done();
  });

});
