import arraySort from 'array-sort';

import {
  SET_MODAL,
  DELETE_MEAL_IN_EDIT_MODAL,
  ADD_MEAL_IN_EDIT_MENU_MODAL,
} from './actiontypes';

/**
 * sets modal state
 *
 * @param {Boolean} isOpen open modal
 * @param {Boolean} isEdit modal is in edit state
 * @param {Boolean} isInfo modal is in info state
 * @param {Boolean} isSetMenu modal is in set menu state
 * @param {Boolean} close close modal
 * @param {Object} content modal content;
 * @param {String} contentLabel modal label
 * @param {object} pagination modal pagination
 * @returns {Object} action types and modal properties
 */
export const setModal = ({
  isOpen = false,
  isEdit = false,
  isInfo = false,
  isSetMenu = false,
  isOrderInfo = false,
  close = true,
  content = {},
  contentLabel = '',
  pagination
}) => (
  {
    type: SET_MODAL,
    modal: {
      isOpen,
      isEdit,
      isInfo,
      isOrderInfo,
      isSetMenu,
      close,
      contentLabel,
      content,
      pagination
    }
  }
);

/**
 * Adds meal to menu on edit state
 *
 * @param {String} newMeal meal to add to modal in edit state
 * @returns {Object} returns action type 'ADD_MEAL_EDIT_MENU' and meal Id
 */
export const addMealInEditMenuModal = newMeal => (dispatch, getState) => {
  const { meals: oldMeals } = getState().modal.content;
  if (oldMeals) {
    // remove new meal from old meals if present
    const tempMeals = oldMeals.filter(oldMeal => oldMeal.id !== newMeal.id);

    if (oldMeals.length === 0 || tempMeals.length === oldMeals.length) {
      return dispatch({
        type: ADD_MEAL_IN_EDIT_MENU_MODAL,
        newMeals: arraySort([...tempMeals, newMeal], 'title')
      });
    }
  }
};

/**
 * Deletes meal in Modal content on edit state
 *
 * @param {String} mealId Id of meal to delete from modal in edit state
 * @returns {Object} returns action type 'DELETE_MEAL_EDIT_MODAL' and meal Id
 */
export const deleteMealInEditModal = mealId => (dispatch, getState) => {
  const { content } = getState().modal;
  return dispatch({
    type: DELETE_MEAL_IN_EDIT_MODAL,
    newContent: {
      meals: content.meals.filter(meal => meal.id !== mealId)
    }
  });
};
