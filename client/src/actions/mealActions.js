import arraySort from 'array-sort';

import serverReq from '../helpers/serverReq';
import notify from '../helpers/notify';
import {
  SET_MEAL_FOR_EDIT,
  REMOVE_MEAL_FROM_EDIT,
  SET_MEALS,
  UPDATE_MEAL_ON_EDIT,
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
    const tempMeals = [...meals];
    return dispatch({
      type: SET_MEAL_FOR_EDIT,
      mealForEdit: { ...tempMeals.filter(meal => meal.id === mealId)[0] }
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
 * Updates a meal on edit
 * @param {Object} update - the updated property and it's value
 * @return {Object} - returns an object that consist of properties type 'UPDATE_MEAL_ON_EDIT'
 */
export const updateMealOnEdit = update => (dispatch, getState) => {
  const { mealOnEdit } = getState().meal;
  const tempMeal = { ...mealOnEdit };

  return dispatch({
    type: UPDATE_MEAL_ON_EDIT,
    updatedMeal: {
      ...tempMeal,
      ...update
    }
  });
};

/**
 * Sends async server requests to get all meals using the axios api
 *
 * @return {Function} - function that dispatches meals and serverRes action to the redux store
 */
export const getMeals = ({ limit = 12, offset = 0 }) => (dispatch) => {
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
    .catch(err => err);
};

/**
 * Sends async server requests to delete meal using the axios api
 *
 * @param {String} mealId - Id of neal to delete
 * @return {Function} - function that dispatches meals and serverRes action to the redux store
 */
export const deleteMeal = mealId => (dispatch, getState) => {
  return serverReq('delete', `/api/v1/meals/${mealId}`)
    .then((response) => {
      if (response.status === 204) {
        const { meals: oldMeals, pagination } = getState().meal;
        // dispatch(getMeals({}));

        const newMeals = oldMeals.filter(meal => meal.id !== mealId);
        pagination.count -= 1;

        // get meals if current meal state is empty
        if (newMeals.length === 0) {
          return dispatch(getMeals({}));
        }

        dispatch({
          type: SET_MEALS,
          meals: arraySort(newMeals, 'title'),
          pagination
        });
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
export const postMeal = data => (dispatch, getState) => {
  return serverReq('post', '/api/v1/meals', data)
    .then((response) => {
      if (response.data) {
        const { success, message, meal } = response.data;

        if (success) {
          const { meals, pagination } = getState().meal;
          const tempMeals = [...meals];

          if (tempMeals.length >= 12) {
            // remove last meal
            tempMeals.pop();
          }

          // add new meal
          tempMeals.unshift(meal);

          dispatch({
            type: SET_MEALS,
            meals: arraySort(tempMeals, 'title'),
            pagination
          });

          notify(message, 'toast-success');
          return success;
        }

        notify(message, 'toast-danger');
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
export const updateMeal = ({ mealId, data }) => (dispatch, getState) => (
  serverReq('put', `/api/v1/meals/${mealId}`, data)
    .then((response) => {
      if (response.data) {
        const { success, message } = response.data;
        if (success) {
          const { meals, pagination } = getState().meal;
          let tempMeals = [...meals];

          tempMeals = tempMeals.map((meal) => {
            if (meal.id === mealId) {
              return {
                ...meal,
                ...data
              };
            }
            return meal;
          });

          dispatch({
            type: SET_MEALS,
            meals: arraySort(tempMeals, 'title'),
            pagination
          });

          notify(message, 'toast-success');
        } else {
          notify(message, 'toast-danger');
        }

        return response.data;
      }
    })
    .catch(err => notify(err))
);
