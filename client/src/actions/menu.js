const setMenu = ({
  admin = '',
  success: isLogin,
  message: loginMessage,
  id = '',
  exp: expire = ''
}) => (
  {
    type: 'SET_USER_DATA',
    userData: {
      id,
      loginMessage,
      isLogin,
      admin,
      expire
    }
  }
);

export default setMenu;
