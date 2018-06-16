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
