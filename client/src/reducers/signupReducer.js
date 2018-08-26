import { SET_SIGNUP_SUCCESS } from '../actions/actiontypes';

export const signUpReducersDefaultState = {
  signUpSuccess: {
    message: '',
    success: false,
  }
};

export const signUpReducer = (state = signUpReducersDefaultState, action) => {
  switch (action.type) {
    case SET_SIGNUP_SUCCESS:
      return {
        ...state,
        signUpSuccess: {
          ...action.isSignUp
        }
      };
    default:
      return state;
  }
};
