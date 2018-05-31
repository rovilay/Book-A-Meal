const setUserData = ({
  admin = '',
  success: isLogin,
  message: loginMessage,
  id = '',
}) => (
  {
    type: 'SET_USER_DATA',
    userData: {
      id,
      loginMessage,
      isLogin,
      admin
    }
  }
);

export default setUserData;
