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

/**
 * Sets a meal for edit
 *
 * @param  {String}  mealId - Id of meal to edit
 * @return {Object} - returns an object that consist of properties type 'SET_MENU' and menus
 */
const setMealForEdit = mealId => (
  {
    type: 'SET_MEAL_FOR_EDIT',
    mealId
  }
);

/**
 * Removes a meal from edit
 *
 * @return {Object} - returns an object that consist of properties type 'REMOVE_MEAL_FROM_EDIT'
 */
const removeMealFromEdit = () => (
  {
    type: 'REMOVE_MEAL_FROM_EDIT',
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
 * set Orders action generator
 *
 * @param {String} grandTotalPrice- Total price of all orders
 * @param {Array} orders- array of all orders
 * @return {Object} - returns action object with type 'SET_ORDERS' and orders properties
 */
const setOrders = ({ grandTotalPrice, orders: history }) => ({
  type: 'SET_ORDERS',
  orders: {
    grandTotalPrice,
    history
  }
});

/**
 * Sends server response as action to store
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
 * resets server response as action to store
 *
 * @param {Object} - Object that consist of success, message
 * @return {Object} - returns action type and get meals response
 */
const resetServerRes = () => ({
  type: 'RESET_SERVER_RES',
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
  isOrderInfo = false,
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
      isOrderInfo,
      close,
      contentLabel,
      content
    }
  }
);

/**
 * ADD meal in edit menu meal content on edit state
 *
 * @param {String} mealId Id of meal to add from modal in edit state
 * @returns {Object} returns action type 'ADD_MEAL_EDIT_MENU' and meal Id
 */
const addMealInEditMenu = mealId => ({
  type: 'ADD_MEAL_EDIT_MENU',
  mealId
});

/**
 * delete meal in edit menu meal content on edit state
 *
 * @param {String} mealId Id of meal to add from modal in edit state
 * @returns {Object} returns action type 'DELETE_MEAL_EDIT_MENU' and meal Id
 */
const deleteMealInEditMenu = mealId => ({
  type: 'DELETE_MEAL_EDIT_MENU',
  mealId
});

/**
 * empty meal in edit menu meal content on edit state
 *
 * @returns {Object} returns action type 'EMPTY_EDIT_MENU'
 */
const emptyEditMenu = () => ({
  type: 'EMPTY_EDIT_MENU'
});

/**
 * Deletes meal in Modal content on edit state
 *
 * @param {String} mealId Id of meal to delete from modal in edit state
 * @returns {Object} returns action type 'DELETE_MEAL_EDIT_MODAL' and meal Id
 */
const deleteMealInEditModal = mealId => ({
  type: 'DELETE_MEAL_EDIT_MODAL',
  mealId
});

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
        setTimeout(() => {
          dispatch(resetServerRes());
        }, 2000);
      }
    })
    .catch((err) => { console.log(err); });
};

/**
 * Sends async server requests to delete meal using the axios api
 *
 * @param {String} mealId - Id of neal to delete
 * @return {Function} - function that dispatches meals and serverRes action to the redux store
 */
const deleteMeal = mealId => (dispatch) => {
  serverReq('delete', `/api/v1/meals/${mealId}`)
    .then((response) => {
      if (response.data) {
        const { success, message } = response.data;
        dispatch(serverRes({ success, message }));
        // setTimeout(() => {
        //   dispatch(resetServerRes());
        // }, 2000);
      }
    })
    .catch((err) => { console.log(err); });
};

/**
 * Sends async server requests to post new meal using the axios api
 *
 * @param {Object} data - data object with property title, price, description and image(optional)
 * @return {Function} - function that dispatches serverRes action to the redux store
 */
const postMeal = data => (dispatch) => {
  serverReq('post', '/api/v1/meals', data)
    .then((response) => {
      if (response.data) {
        const { success, message } = response.data;
        dispatch(serverRes({ success, message }));

        setTimeout(() => {
          dispatch(resetServerRes());
        }, 2000);
      }
    })
    .catch((err) => { console.log(err); });
};

/**
 * Sends async server requests to update meal using the axios api
 *
 * @param {String} mealId - Id of meal to update
 * @param {Object} data - data of meal to update
 * @return {Function} - function that dispatches serverRes action to the redux store
 */
const updateMeal = ({ mealId, data }) => (dispatch) => {
  serverReq('put', `/api/v1/meals/${mealId}`, data)
    .then((response) => {
      if (response.data) {
        const { success, message } = response.data;
        dispatch(serverRes({ success, message }));
        setTimeout(() => {
          dispatch(resetServerRes());
        }, 1000);
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
        setTimeout(() => {
          dispatch(resetServerRes());
        }, 1000);
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
        dispatch(serverRes({ success, message }));
        if (success) {
          dispatch(emptyNewMenu());
        }
      }
      setTimeout(() => {
        dispatch(resetServerRes());
      }, 1000);
    })
    .catch((err) => { console.log(err); });
};

/**
 * Sends async server requests to update menu using the axios api
 *
 * @param {String} menuDate - date of menu to update {DD/MM/YYYY}
 * @param {Object} data - updated menu data
 * @return {Function} - function that dispatches serverRes action to the redux store
 */
const updateMenu = ({ menuDate, data }) => (dispatch) => {
  serverReq('put', `/api/v1/menus/${menuDate}`, data)
    .then((response) => {
      if (response.data) {
        const { success, message } = response.data;
        dispatch(serverRes({ success, message }));
        setTimeout(() => {
          dispatch(resetServerRes());
        }, 1000);
      }
    })
    .catch(err => err);
};

/**
 * Sends async server requests to get all orders using the axios api
 *
 * @return {Function} - function that dispatches setOrders and serverRes action to the redux store
 */
const getAllOrders = () => (dispatch) => {
  serverReq('get', '/api/v1/orders')
    .then((response) => {
      if (response.data) {
        const {
          success,
          message,
          grandTotalPrice,
          orders
        } = response.data;
        dispatch(setOrders({ grandTotalPrice, orders }));
        dispatch(serverRes({ success, message }));
        setTimeout(() => {
          dispatch(resetServerRes());
        }, 1000);
      }
    })
    .catch(err => err);
};

const adminActions = {
  postMenu,
  getMeals,
  postMeal,
  updateMeal,
  deleteMeal,
  getMenus,
  setDefault,
  setMeals,
  setMenus,
  setModal,
  emptyNewMenu,
  updateMenu,
  addMealToNewMenu,
  removeMealFromNewMenu,
  deleteMealInEditModal,
  deleteMealInEditMenu,
  addMealInEditMenu,
  emptyEditMenu,
  setMealForEdit,
  removeMealFromEdit,
  getAllOrders
};

export default adminActions;
