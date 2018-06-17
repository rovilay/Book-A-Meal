import serverReq from '../helpers/serverReq';

/**
 * Adds mealId to new menu in store
 *
 * @param  {string}  mealId - Id of meal for the menu
 * @return {Object} - returns an object that consist of properties type 'SET_NEW_MENU' and mealId
 */
const addMealToNewMenu = mealId => (
  {
    type: 'ADD_MEAL_NEW_MENU',
    mealId
  }
);

/**
 * Remove mealId from new menu in store
 *
 * @param  {string}  mealId - Id of meal for the menu
 * @return {Object} - returns an object that consist of properties type 'SET_NEW_MENU' and mealId
 */
const removeMealFromNewMenu = mealId => (
  {
    type: 'REMOVE_MEAL_NEW_MENU',
    mealId
  }
);

/**
 * Empty new menu in store
 *
 * @return {Object} - returns an object that consist of properties type 'SET_NEW_MENU' and mealId
 */
const emptyNewMenu = () => (
  {
    type: 'EMPTY_NEW_MENU',
  }
);

/**
 * Adds menus to store
 *
 * @param  {Array}  menus - an array of menu
 * @return {Object} - returns an object that consist of properties type 'SET_MENU' and menus
 */
const setMenus = menus => (
  {
    type: 'SET_MENUS',
    menus
  }
);

const setDefault = () => (
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
const serverRes = ({
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
 * set admin modal action
 *
 * @param {Boolean} isOpen- open modal
 * @param {Boolean} isEdit- modal is in edit state
 * @param {Boolean} isInfo- modal is in info state
 * @param {Boolean} close- close modal
 * @param {String} contentLabel- modal content title
 * @param {Object} content- modal content
 * @return {Object} - returns action type and modal controls
 */
const setModal = ({
  isOpen,
  isEdit,
  isInfo,
  close,
  contentLabel,
  content = {}
}) => (
  {
    type: 'SET_ADMIN_MODAL',
    modal: {
      isOpen,
      isEdit,
      isInfo,
      close,
      contentLabel,
      content
    }
  }
);


/**
 * Sends async server requests to get all meals using the axios api
 *
 * @return {Function} - function that dispatches meals and serverRes action to the redux store
 */
const getMeals = () => (dispatch) => {
  serverReq('get', '/api/v1/meals')
    .then((response) => {
      if (response.data) {
        const { success, meals, message } = response.data;
        dispatch(setMeals(meals));
        dispatch(serverRes({ success, message }));
        if (success) {
          dispatch(emptyNewMenu());
        }
      }
    })
    .catch((err) => { console.log(err); });
};

/**
 * Sends async server requests to get all menus using the axios api
 *
 * @return {Function} - function that dispatches meals and serverRes action to the redux store
 */
const getMenus = () => (dispatch) => {
  serverReq('get', '/api/v1/menus')
    .then((response) => {
      if (response.data) {
        const { success, menus, message } = response.data;
        if (menus) {
          dispatch(setMenus(menus));
        }
        dispatch(serverRes({ success, message }));
      }
    })
    .catch((err) => { console.log(err); });
};

/**
 * Sends async server requests to post  new menu using the axios api
 *
 * @param {String} postOn - date menu should be posted {YYYY-MM-DD}
 * @param {Array} meals - Array of meal Ids
 * @return {Function} - function that dispatches serverRes action to the redux store
 */
const postMenu = ({ postOn, meals }) => (dispatch) => {
  serverReq('post', '/api/v1/menus', { postOn, meals })
    .then((response) => {
      if (response.data) {
        const { success, message } = response.data;
        // dispatch(setMenus(menus));
        dispatch(serverRes({ success, message }));
      }
    })
    .catch((err) => { console.log(err); });
};

const adminActions = {
  postMenu,
  getMeals,
  getMenus,
  setDefault,
  setMeals,
  setMenus,
  setModal,
  emptyNewMenu,
  addMealToNewMenu,
  removeMealFromNewMenu,
};

export default adminActions;
