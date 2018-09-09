// import moment from 'moment';
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
 * @param {Array} menuMeals meals of menu want to edit
 */
export const setMenuForEdit = menuMeals => dispatch => dispatch({
  type: SET_MENU_FOR_EDIT,
  editMenu: [...menuMeals.map(meal => meal.id)]
});


/**
 * Adds mealId to new menu in store
 *
 * @param  {string}  mealId - Id of meal for the menu
 * @return {Object} - returns an object that consist of
  properties type 'SET_NEW_MENU' and mealId
 */
export const addMealToNewMenu = mealId => (dispatch) => dispatch({
  type: ADD_MEAL_TO_NEW_MENU,
  mealId
});

/**
 * Removes mealId from new menu in store
 *
 * @param  {string}  mealId - Id of meal for the menu
 * @return {Object} - returns an object that consist of
  properties type 'SET_NEW_MENU' and mealId
 */
export const removeMealFromNewMenu = mealId => (dispatch) => dispatch({
  type: REMOVE_MEAL_FROM_NEW_MENU,
  mealId
});


/**
 * Empty new menu in store
 *
 * @return {Object} - returns an object that consist of
  properties type 'SET_NEW_MENU' and mealId
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
export const addMealInEditMenu = mealId => (dispatch) => dispatch({
  type: ADD_MEAL_IN_EDIT_MENU,
  mealId
});

/**
 * delete meal in edit menu meal content on edit state
 *
 * @param {String} mealId Id of meal to delete from menu in edit state
 * @returns {Object} returns action type 'DELETE_MEAL_EDIT_MENU' and meal Id
 */
export const deleteMealInEditMenu = mealId => (dispatch) => dispatch({
  type: DELETE_MEAL_IN_EDIT_MENU,
  mealId
});

/**
 * delete meal in menu
 *
 * @param {String} mealId Id of meal to delete from menu
 * @returns {Object} returns action type 'DELETE_MEAL_IN_MENU' and meal Id
 */
export const deleteMealInMenu = mealId => (dispatch) => dispatch({
  type: DELETE_MEAL_IN_MENU,
  mealId
});

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
 * @return {Function} - function that dispatches meals and
  serverRes action to the redux store
 */
export const getAllMenus = ({ limit = 10, offset = 0 }) => (dispatch) => (
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
    .catch(error => error)
);

/**
 *  * Sends async server requests to get a menu's meals using the axios api
 *
 * @param {string} mealUrl Url of meals for the menu
 * @param {number} limit pagination limit
 * @param {number} offset pagination offset
 */
export const getMenuMeals = (
  mealUrl, { limit = 5, offset = 0 }
) => dispatch => (
  serverReq('get', `${mealUrl}?limit=${limit}&offset=${offset}`)
    .then((response) => {
      if (response.data) {
        const { success, menu, pagination } = response.data;
        if (success && menu) {
          dispatch({
            type: SET_MENU_MEALS,
            menuMeals: {
              meals: arraySort(menu[0].Meals, 'title'),
              pagination
            }
          });
        } else {
          dispatch({
            type: SET_MENU_MEALS,
            menuMeals: {
              meals: [],
              pagination: {
                limit: 5,
                offset: 0,
                count: 0,
                numOfPages: 1
              }
            }
          });
        }
      }
    })
    .catch((error) => {
      if (error.response.data && !error.response.data.success) {
        dispatch({
          type: SET_MENU_MEALS,
          menuMeals: {
            meals: [],
            pagination: {
              limit: 5,
              offset: 0,
              count: 0,
              numOfPages: 1
            }
          }
        });
      }
    })
);

/**
 * Sends async server requests to get today's menu using the axios api
 *
 * @return {Function} - function that dispatches the action to the redux store
 */
export const getTodayMenu = ({ limit = 12, offset = 0 }) => (dispatch) => (
  serverReq('get', `/api/v1/menus/today?limit=${limit}&offset=${offset}`)
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
      }
    })
    .catch(error => error)
);

/**
 * Sends async server requests to post  new menu using the axios api
 *
 * @param {String} postOn - date menu should be posted {YYYY-MM-DD}
 * @param {Array} meals - Array of meal Ids
 * @return {Function} - function that dispatches
  serverRes action to the redux store
 */
export const postMenu = ({ postOn, meals }) => (dispatch) => (
  serverReq('post', '/api/v1/menus', { postOn, meals })
    .then((response) => {
      if (response.data) {
        const { success, message } = response.data;
        if (success) {
          dispatch(getAllMenus({}));
          notify(message, 'toast-success');
        }

        return success;
      }
    })
    .catch(error => {
      if (error.response.data) {
        const { message } = error.response.data;
        notify(message, 'toast-danger');
      }
    })
);

/* eslint arrow-parens: 0 */
/**
 * Sends async server requests to update menu using the axios api
 *
 * @param {String} menuId - id of menu to update meals
 * @param {Array} meals - updated menu meals
 * @return {Function} - function that dispatches
  serverRes action to the redux store
 */
export const updateMenu = ({
  menuId,
  meals
}) => dispatch => serverReq('post', `/api/v1/menus/${menuId}/meals`, { meals })
  .then((response) => {
    if (response.data) {
      const { success, message } = response.data;
      if (success) {
        dispatch(emptyEditMenu());
        dispatch(getMenuMeals(`/api/v1/menus/${menuId}/meals`, {}));
        notify(message, 'toast-success');
      } else {
        notify(message, 'toast-danger');
      }

      return response.data;
    }
  })
  .catch(error => error);

/**
 * Sends async server requests to remove meal from menu using the axios api
 *
 * @param {String} mealUrl - id of menu to delete meal from
 * @param {Array} meals - meals to remove
 * @return {Function} - function that dispatches
  serverRes action to the redux store
 */
export const deleteMenuMeal = ({
  mealUrl,
  meals,
}) => dispatch => (
  serverReq('delete', mealUrl, { meals })
    .then((response) => {
      if (response.data) {
        const { success, message } = response.data;
        if (success) {
          dispatch(emptyEditMenu());
          dispatch(getMenuMeals(mealUrl, {}));
          notify(message, 'toast-success');
        } else {
          notify(message, 'toast-danger');
        }

        return response.data;
      }
    })
    .catch(error => error)
);
