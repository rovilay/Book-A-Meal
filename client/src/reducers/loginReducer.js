import { SET_USER_DATA, LOG_OUT_USER } from '../actions/actiontypes';

const userDataDefaultState = {
  user: {
    id: '',
    loginMessage: '',
    isLogin: false,
    firstName: '',
    lastName: '',
    admin: '',
    expire: ''
  }
};

const loginReducer = (state = userDataDefaultState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        user: {
          ...action.userData
        }
      };
    case LOG_OUT_USER:
      return { ...userDataDefaultState };
    default:
      return state;
  }
};

export default loginReducer;
