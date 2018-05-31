const signUpReducersDefaultState = {
  signUpSuccess: {
    message: '',
    success: false,
  }
};

const signUpReducer = (state = signUpReducersDefaultState, action) => {
  switch (action.type) {
    case 'SET_SIGNUP_SUCCESS':
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

export default signUpReducer;
