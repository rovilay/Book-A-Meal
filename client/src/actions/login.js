import jwt from 'jsonwebtoken';

import serverReq from '../helpers/serverReq';
import { storeInLs, delFromLs } from '../helpers/Ls';
/**
 * sets logged in user data to store
 * @param {Object} param0 object with user data
 */
export const setUserData = ({
  admin = '',
  success: isLogin,
  message: loginMessage,
  firstName = '',
  lastName = '',
  id = '',
  exp: expire = ''
}) => (
  {
    type: 'SET_USER_DATA',
    userData: {
      id,
      loginMessage,
      isLogin,
      firstName,
      lastName,
      admin,
      expire
    }
  }
);

export const logOutUser = () => (
  {
    type: 'LOG_OUT_USER'
  }
);

/**
 * Sends async server requests to login user using the axios api
 *
 * @return {Function} - function that dispatches setOrders and serverRes action to the redux store
 */
export const loginUser = ({ email, password }) => (dispatch) => {
  serverReq('post', '/api/v1/auth/login', { email, password })
    .then((response) => {
      const {
        token,
        message,
        success,
        firstName,
        lastName
      } = response.data;
      if (success) {
        storeInLs('jwt', token);
        const {
          id,
          admin,
          exp
        } = jwt.decode(token);
        dispatch(setUserData({
          message,
          success,
          id,
          admin,
          firstName,
          lastName,
          exp
        }));
      } else {
        delFromLs('jwt');
        dispatch(setUserData({
          message,
          success
        }));
      }
    })
    .catch(err => err);
};
