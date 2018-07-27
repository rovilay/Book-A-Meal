import moment from 'moment';

import { SET_TODAY_MENU } from './actiontypes';
import serverReq from '../helpers/serverReq';

/**
 * Returns object to dispatch to store
 *
 * @param  {Object} data - response gotten from server
 * @return {Object} - returns an object that consist of today's menu
 */
const setTodayMenu = ({
  success: gotMenu,
  message,
  Meals = []
}) => (
  {
    type: SET_TODAY_MENU,
    menu: {
      message,
      gotMenu,
      Meals
    }
  }
);

/**
 * Sends async server requests to get today's menu using the axios api
 *
 * @return {Function} - function that dispatches the action to the redux store
 */
const getTodayMenu = () => (dispatch) => {
  const [DD, MM, YYYY] = moment().format('DD-MM-YYYY').split('-');
  serverReq('get', `/api/v1/menus/${DD}/${MM}/${YYYY}`)
    .then((response) => {
      if (response.data) {
        const { success, menu, message } = response.data;
        let Meals = [];
        if (menu) {
          Meals = [...menu[0].Meals];
        }
        dispatch(setTodayMenu({ success, Meals, message }));
      }
    })
    .catch(err => err);
};

export default getTodayMenu;
