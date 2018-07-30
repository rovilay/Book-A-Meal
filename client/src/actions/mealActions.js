import arraySort from 'array-sort';

import serverReq from '../helpers/serverReq';
import notify from '../helpers/notify';
import {
  SET_MEAL_FOR_EDIT,
  REMOVE_MEAL_FROM_EDIT,
  SET_MEALS,
  SET_DEFAULT_MEAL_STATE,
  MEAL_ERROR
} from './actiontypes';

/**
 * Sets a meal for edit
 *
 * @param  {String}  mealId - Id of meal to edit
 * @return {Object} - returns an object that consist of properties type 'SET_MENU' and menus
 */
export const setMealForEdit = mealId => (
  (dispatch, getState) => {
    const { meals } = getState().meal;
    return dispatch({
      type: SET_MEAL_FOR_EDIT,
      mealForEdit: meals.filter(meal => meal.id === mealId)[0]
    });
  }
);

/**
 * Removes a meal from edit
 *
 * @return {Object} - returns an object that consist of properties type 'REMOVE_MEAL_FROM_EDIT'
 */
export const removeMealFromEdit = () => (
  {
    type: REMOVE_MEAL_FROM_EDIT,
  }
);

/**
 * Removes a meal from edit
 *
 * @return {Object} - returns an object that consist of properties type 'REMOVE_MEAL_FROM_EDIT'
 */
export const setDefaultMealState = () => (
  {
    type: SET_DEFAULT_MEAL_STATE,
  }
);

/**
 * Sends async server requests to get all meals using the axios api
 *
 * @return {Function} - function that dispatches meals and serverRes action to the redux store
 */
export const getMeals = () => (dispatch) => {
  serverReq('get', '/api/v1/meals')
    .then((response) => {
      if (response.data) {
        const { success, meals } = response.data;
        if (success) {
          dispatch({
            type: SET_MEALS,
            meals: arraySort(meals, 'title')
          });
        }
      }
    })
    .catch(err => err);
};

/**
 * Sends async server requests to delete meal using the axios api
 *
 * @param {String} mealId - Id of neal to delete
 * @return {Function} - function that dispatches meals and serverRes action to the redux store
 */
export const deleteMeal = mealId => (dispatch) => {
  return serverReq('delete', `/api/v1/meals/${mealId}`)
    .then((response) => {
      if (response.status === 204) {
        dispatch(getMeals());
        notify('Meal was successfully Deleted!', 'toast-success');
      } else if (response.data.message) {
        dispatch({
          type: MEAL_ERROR,
          error: response.data.message
        });

        notify(response.data.message, 'toast-danger');

        return response.data.message;
      }
    })
    .catch((error) => {
      dispatch({
        type: MEAL_ERROR,
        error
      });
    });
};

/**
 * Sends async server requests to post new meal using the axios api
 *
 * @param {Object} data - data object with property title, price, description and image(optional)
 * @return {Function} - function that dispatches serverRes action to the redux store
 */
/* eslint arrow-body-style:0 */
export const postMeal = data => (dispatch) => {
  return serverReq('post', '/api/v1/meals', data)
    .then((response) => {
      if (response.data) {
        const { success, message } = response.data;
        if (success) {
          dispatch(getMeals());
          notify(message, 'toast-success');
        } else {
          notify(message, 'toast-danger');
        }

        return success;
      }
    })
    .catch(err => notify(err));
};

/**
 * Sends async server requests to update meal using the axios api
 *
 * @param {String} mealId - Id of meal to update
 * @param {Object} data - data of meal to update
 * @return {Function} - function that dispatches serverRes action to the redux store
 */
export const updateMeal = ({ mealId, data }) => (dispatch) => {
  serverReq('put', `/api/v1/meals/${mealId}`, data)
    .then((response) => {
      if (response.data) {
        const { success, message } = response.data;
        if (success) {
          dispatch(getMeals());
          notify(message, 'toast-success');
        } else {
          notify(message, 'toast-danger');
        }
      }
    })
    .catch(err => notify(err));
};
