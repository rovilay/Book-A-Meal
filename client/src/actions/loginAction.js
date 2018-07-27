import jwt from 'jsonwebtoken';
import { toast } from 'react-toastify';

import { SET_USER_DATA, LOG_OUT_USER } from './actiontypes';
import serverReq from '../helpers/serverReq';
import { storeInLs, delFromLs } from '../helpers/Ls';
import history from '../helpers/history';

const notify = (msg) => {
  toast(msg, {
    position: toast.POSITION.TOP_CENTER,
    className: 'toast',
    progressClassName: 'toast-progress'
  });
};

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
    type: SET_USER_DATA,
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

export const logOutUser = () => {
  delFromLs('jwt');
  delFromLs('user');
  return (
    {
      type: LOG_OUT_USER
    }
  );
};

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
        storeInLs('user', { firstName, lastName });
        const {
          id,
          admin,
          exp
        } = jwt.decode(token);
        history.push('/dashboard');
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
        delFromLs('user');
        dispatch(setUserData({
          message,
          success
        }));
        notify(message);
      }
    })
    .catch(err => err);
};
