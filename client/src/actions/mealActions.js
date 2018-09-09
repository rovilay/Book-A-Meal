import arraySort from 'array-sort';

import serverReq from '../helpers/serverReq';
import notify from '../helpers/notify';
import {
  SET_MEAL_FOR_EDIT,
  REMOVE_MEAL_FROM_EDIT,
  SET_MEALS,
  UPDATE_MEAL_ON_EDIT,
  SET_DEFAULT_MEAL_STATE,
  MEAL_ERROR,
  DELETE_MEAL,
  ADD_MEAL,
  UPDATE_MEAL
} from './actiontypes';

/**
 * Sets a meal for edit
 *
 * @param  {String}  mealId - Id of meal to edit
 * @return {Object} - returns an object that consist of
  properties type 'SET_MENU' and menus
 */
export const setMealForEdit = mealId => dispatch => dispatch({
  type: SET_MEAL_FOR_EDIT,
  mealId
});


/**
 * Removes a meal from edit
 *
 * @return {Object} - returns an object that consist of
  properties type 'REMOVE_MEAL_FROM_EDIT'
 */
export const removeMealFromEdit = () => (
  {
    type: REMOVE_MEAL_FROM_EDIT,
  }
);

/**
 * Removes a meal from edit
 *
 * @return {Object} - returns an object that consist of
  properties type 'REMOVE_MEAL_FROM_EDIT'
 */
export const setDefaultMealState = () => (
  {
    type: SET_DEFAULT_MEAL_STATE,
  }
);

/**
 * Updates a meal on edit
 * @param {Object} mealUpdate - the updated property and it's value
 * @return {Object} - returns an object that consist of
  properties type 'UPDATE_MEAL_ON_EDIT'
 */
export const updateMealOnEdit = mealUpdate => dispatch => dispatch({
  type: UPDATE_MEAL_ON_EDIT,
  mealUpdate
});

/**
 * Sends async server requests to get all meals using the axios api
 *
 * @return {Function} - function that dispatches meals and
  serverRes action to the redux store
 */
export const getMeals = ({ limit = 12, offset = 0 }) => dispatch => (
  serverReq('get', `/api/v1/meals?limit=${limit}&offset=${offset}`)
    .then((response) => {
      if (response.data) {
        const { success, meals, pagination } = response.data;
        if (success) {
          dispatch({
            type: SET_MEALS,
            meals: arraySort(meals, 'title'),
            pagination
          });
        }
      }
    })
    .catch(error => error)
);

/**
 * Sends async server requests to delete meal using the axios api
 *
 * @param {String} mealId - Id of neal to delete
 * @return {Function} - function that dispatches meals and
  serverRes action to the redux store
 */
export const deleteMeal = mealId => dispatch => (
  serverReq('delete', `/api/v1/meals/${mealId}`)
    .then((response) => {
      if (response.status === 204) {
        dispatch({
          type: DELETE_MEAL,
          mealId
        });
        notify('Meal was successfully Deleted!', 'toast-success');
      }
    })
    .catch((error) => {
      if (error.response.data) {
        const { message } = error.response.data;
        dispatch({
          type: MEAL_ERROR,
          error
        });
        notify(message, 'toast-danger');
        return message;
      }
    })
);

/**
 * Sends async server requests to post new meal using the axios api
 *
 * @param {Object} data - data object with property title,
  price, description and image(optional)
 * @return {Function} - function that dispatches
  serverRes action to the redux store
 */
/* eslint arrow-body-style:0 */
export const postMeal = data => dispatch => (
  serverReq('post', '/api/v1/meals', data)
    .then((response) => {
      if (response.data) {
        const { success, message, meal } = response.data;

        if (success) {
          dispatch({
            type: ADD_MEAL,
            meal
          });

          notify(message, 'toast-success');
          return success;
        }
      }
    })
    .catch((error) => {
      if (error.response.data) {
        const { message } = error.response.data;
        notify(message, 'toast-danger');
      }
    })
);

/**
 * Sends async server requests to update meal using the axios api
 *
 * @param {String} mealId - Id of meal to update
 * @param {Object} data - data of meal to update
 * @return {Function} - function that dispatches
  serverRes action to the redux store
 */
export const updateMeal = ({ mealId, data }) => dispatch => (
  serverReq('put', `/api/v1/meals/${mealId}`, data)
    .then((response) => {
      if (response.data) {
        const { success, message } = response.data;
        if (success) {
          dispatch({
            type: UPDATE_MEAL,
            meal: {
              id: mealId,
              ...data
            }
          });

          notify(message, 'toast-success');
        }

        return response.data;
      }
    })
    .catch((error) => {
      if (error.response.data) {
        const { message } = error.response.data;
        notify(message, 'toast-danger');
      }
    })
);
