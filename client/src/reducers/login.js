const userDataDefaultState = {
  user: {
    id: '',
    loginMessage: '',
    isLogin: false,
    admin: '',
    expire: ''
  }
};

const loginReducer = (state = userDataDefaultState, action) => {
  switch (action.type) {
    case 'SET_USER_DATA':
      return {
        ...state,
        user: {
          ...action.userData
        }
      };
    default:
      return state;
  }
};

export default loginReducer;
