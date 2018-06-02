const setSuccessfulSignUpMsg = msg => ({
  type: 'SET_SIGNUP_SUCCESS',
  isSignUp: {
    success: true,
    message: msg
  }
});

export default setSuccessfulSignUpMsg;
