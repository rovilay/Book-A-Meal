import moment from 'moment';
import arraySort from 'array-sort';

import notify from '../helpers/notify';
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
  SET_MENU_FOR_EDIT,
} from './actiontypes';
import serverReq from '../helpers/serverReq';

/**
 * Sets a menu for edit
 * @param {Array} menuMeals meeals of menu want to edit
 */
export const setMenuForEdit = menuMeals => dispatch => dispatch({
  type: SET_MENU_FOR_EDIT,
  editMenu: [...menuMeals.map(meal => meal.id)]
});


/**
 * Adds mealId to new menu in store
 *
 * @param  {string}  mealId - Id of meal for the menu
 * @return {Object} - returns an object that consist of properties type 'SET_NEW_MENU' and mealId
 */
export const addMealToNewMenu = mealId => (dispatch, getState) => {
  const { newMenu } = getState().menu;
  return dispatch({
    type: ADD_MEAL_TO_NEW_MENU,
    newMenu: [...new Set([...newMenu, mealId])]
  });
};

/**
 * Remove mealId from new menu in store
 *
 * @param  {string}  mealId - Id of meal for the menu
 * @return {Object} - returns an object that consist of properties type 'SET_NEW_MENU' and mealId
 */
export const removeMealFromNewMenu = mealId => (dispatch, getState) => {
  const { newMenu } = getState().menu;
  return dispatch({
    type: REMOVE_MEAL_FROM_NEW_MENU,
    newMenu: newMenu.filter(id => id !== mealId)
  });
};

/**
 * Empty new menu in store
 *
 * @return {Object} - returns an object that consist of properties type 'SET_NEW_MENU' and mealId
 */
export const emptyNewMenu = () => (
  {
    type: EMPTY_NEW_MENU,
  }
);

/**
 * Adds meal to menu on edit state
 *
 * @param {String} mealId Id of meal to add from modal in edit state
 * @returns {Object} returns action type 'ADD_MEAL_EDIT_MENU' and meal Id
 */
export const addMealInEditMenu = mealId => (dispatch, getState) => {
  const { editMenu } = getState().menu;
  return dispatch({
    type: ADD_MEAL_IN_EDIT_MENU,
    editMenu: [...new Set([...editMenu, mealId])]
  });
};

/**
 * delete meal in edit menu meal content on edit state
 *
 * @param {String} mealId Id of meal to delete from menu in edit state
 * @returns {Object} returns action type 'DELETE_MEAL_EDIT_MENU' and meal Id
 */
export const deleteMealInEditMenu = mealId => (dispatch, getState) => {
  const { editMenu } = getState().menu;
  return dispatch({
    type: DELETE_MEAL_IN_EDIT_MENU,
    editMenu: [...editMenu.filter(mealid => mealid !== mealId)]
  });
};

/**
 * delete meal in menu
 *
 * @param {String} mealId Id of meal to delete from menu
 * @returns {Object} returns action type 'DELETE_MEAL_IN_MENU' and meal Id
 */
export const deleteMealInMenu = mealId => (dispatch, getState) => {
  const { meals, pagination } = getState().menu.menuMeals;
  return dispatch({
    type: DELETE_MEAL_IN_MENU,
    menuMeals: {
      meals: [...meals.filter(meal => meal.id !== mealId)],
      pagination: {
        ...pagination,
        count: pagination.count - 1
      }
    }
  });
};

/**
 * empty meal in edit menu meal content on edit state
 *
 * @returns {Object} returns action type 'EMPTY_EDIT_MENU'
 */
export const emptyEditMenu = () => ({
  type: EMPTY_EDIT_MENU
});


/**
 * Sends async server requests to get all menus using the axios api
 *
 * @return {Function} - function that dispatches meals and serverRes action to the redux store
 */
export const getAllMenus = ({ limit = 10, offset = 0 }) => (dispatch) => {
  serverReq('get', `/api/v1/menus?limit=${limit}&offset=${offset}`)
    .then((response) => {
      if (response.data) {
        const { success, menus, pagination } = response.data;
        if (success && menus) {
          dispatch({
            type: SET_ALL_MENUS,
            menus: arraySort(menus, 'postOn', { reverse: true }),
            pagination
          });
        }
      }
    })
    .catch(err => err);
};

/**
 *  * Sends async server requests to get a menu's meals using the axios api
 *
 * @param {string} mealUrl Url of meals for a menu
 * @param {number} limit pagination limit
 * @param {number} offset pagination offset
 */
export const getMenuMeals = (mealUrl, { limit = 5, offset = 0 }) => dispatch => (
  serverReq('get', `${mealUrl}&limit=${limit}&offset=${offset}`)
    .then((response) => {
      if (response.data) {
        const { success, menus, pagination } = response.data;
        if (success && menus) {
          dispatch({
            type: SET_MENU_MEALS,
            menuMeals: {
              meals: arraySort(menus[0].Meals, 'title'),
              pagination
            }
          });
        }
      }
    })
    .catch(err => err)
);

/**
 * Sends async server requests to get today's menu using the axios api
 *
 * @return {Function} - function that dispatches the action to the redux store
 */
export const getTodayMenu = ({ limit = 12, offset = 0 }) => (dispatch) => {
  const [DD, MM, YYYY] = moment().format('DD-MM-YYYY').split('-');
  serverReq('get', `/api/v1/menus/${DD}/${MM}/${YYYY}?limit=${limit}&offset=${offset}`)
    .then((response) => {
      if (response.data) {
        const { success, menu, pagination } = response.data;
        let Meals = [];
        if (success && menu) {
          Meals = [...menu[0].Meals];
          dispatch({
            type: SET_TODAY_MENU,
            meals: arraySort(Meals, 'title'),
            pagination
          });
        }
    })
    .catch(err => err);
};

/**
 * Sends async server requests to post  new menu using the axios api
 *
 * @param {String} postOn - date menu should be posted {YYYY-MM-DD}
 * @param {Array} meals - Array of meal Ids
 * @return {Function} - function that dispatches serverRes action to the redux store
 */
export const postMenu = ({ postOn, meals }) => (dispatch) => {
  serverReq('post', '/api/v1/menus', { postOn, meals })
    .then((response) => {
      if (response.data) {
        const { success, message } = response.data;
        if (success) {
          dispatch(emptyNewMenu());
          dispatch(getAllMenus({}));
          return notify(message, 'toast-success');
        }
        notify(message, 'toast-danger');
      }
    })
    .catch(err => err);
};

/* eslint arrow-parens: 0 */
/**
 * Sends async server requests to update menu using the axios api
 *
 * @param {String} menuDate - date of menu to update {DD/MM/YYYY}
 * @param {Array} meals - updated menu meals
 * @return {Function} - function that dispatches serverRes action to the redux store
 */
export const updateMenu = ({
  menuDate,
  meals
}) => dispatch => (
  serverReq('put', `/api/v1/menus/${menuDate}`, { meals })
    .then((response) => {
      if (response.data) {
        const { success, message } = response.data;
        if (success) {
          menuDate = menuDate.split('/').reverse().join('-');
          dispatch(emptyEditMenu());
          dispatch(getMenuMeals(`/api/v1/menus?postOn=${menuDate}`, {}));
          notify(message, 'toast-success');
        } else {
          notify(message, 'toast-danger');
        }

        return response.data;
      }
    })
    .catch(err => err)
);

/**
 * Sends async server requests to remove meal from menu using the axios api
 *
 * @param {String} menuDate - date of menu to update {YYYY-MM-DD}
 * @param {Array} meals - meals to remove
 * @return {Function} - function that dispatches serverRes action to the redux store
 */
export const deleteMenuMeal = ({
  menuDate,
  meals,
}) => dispatch => (
  serverReq('delete', `/api/v1/menus?postOn=${menuDate}`, { meals })
    .then((response) => {
      if (response.data) {
        const { success, message } = response.data;
        if (success) {
          dispatch(emptyEditMenu());
          dispatch(getMenuMeals(`/api/v1/menus?postOn=${menuDate}`, {}));
          notify(message, 'toast-success');
        } else {
          notify(message, 'toast-danger');
        }

        return response.data;
      }
    })
    .catch(err => err)
);
