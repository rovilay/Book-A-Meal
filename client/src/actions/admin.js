import serverReq from '../helpers/serverReq';

/**
 * Adds mealId to set menu in store
 *
 * @param  {string}  mealId - Id of meal for the menu
 * @return {Object} - returns an object that consist of properties type 'SET_NEW_MENU' and mealId
 */
export const setNewMenu = mealId => (
  {
    type: 'SET_NEW_MENU',
    mealId
  }
);

/**
 * Adds menus to store
 *
 * @param  {Array}  menus - an array of menu
 * @return {Object} - returns an object that consist of properties type 'SET_MENU' and menus
 */
export const setMenus = menus => (
  {
    type: 'SET_MENUS',
    menus
  }
);

export const setDefault = () => (
  {
    type: 'SET_DEFAULT',
  }
);

/**
 * set meal action
 *
 * @param {Array} meals- Array of meals
 * @return {Object} - returns action type and get meals response
 */
const setMeals = meals => ({
  type: 'SET_MEALS',
  meals
});

/**
 * set meal action
 *
 * @param {Object} - Object that consist of success, message
 * @return {Object} - returns action type and get meals response
 */
export const serverRes = ({
  success,
  message
}) => ({
  type: 'SERVER_RES',
  response: {
    success,
    message
  }
});


/**
 * Sends async server requests to get all meals using the axios api
 *
 * @return {Function} - function that dispatches meals and serverRes action to the redux store
 */
export const getMeals = () => (dispatch) => {
  serverReq('get', '/api/v1/meals')
    .then((response) => {
      if (response.data) {
        const { success, meals, message } = response.data;
        dispatch(setMeals(meals));
        dispatch(serverRes({ success, message }));
      }
    })
    .catch((err) => { console.log(err); });
};

/**
 * Sends async server requests to get all menus using the axios api
 *
 * @return {Function} - function that dispatches meals and serverRes action to the redux store
 */
export const getMenus = () => (dispatch) => {
  serverReq('get', '/api/v1/menus')
    .then((response) => {
      if (response.data) {
        const { success, menus, message } = response.data;
        dispatch(setMenus(menus));
        dispatch(serverRes({ success, message }));
      }
    })
    .catch((err) => { console.log(err); });
};

