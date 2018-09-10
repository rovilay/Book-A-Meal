import serverReq from '../helpers/serverReq';
import notify from '../helpers/notify';
import history from '../helpers/history';
import { SET_SIGNUP_SUCCESS } from './actiontypes';

export const setSuccessfulSignUpMsg = message => ({
  type: SET_SIGNUP_SUCCESS,
  isSignUp: {
    success: true,
    message
  }
});

/*
* Signs up user
*/
export const signUp = signUpDetails => dispatch => serverReq(
  'post', '/api/v1/auth/signup', signUpDetails
)
  .then((response) => {
    const { success, message } = response.data;
    if (success) {
      dispatch(setSuccessfulSignUpMsg(message));
      history.push('/login');
      return response.data;
    }
  })
  .catch(((error) => {
    if (error.response.data) {
      const { message } = error.response.data;
      return notify(message, 'toast-danger');
    }
  }));
