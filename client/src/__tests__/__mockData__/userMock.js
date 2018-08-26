const customerId = '730e7de9-9ff8-4dc5-bc0b-c714f51ea22a';
const adminId = '3af04159-9a93-4b15-a749-e79e680a3daa';

export const user = {
  id: adminId,
  email: 'test@gmail.com',
  password: '1234567',
  admin: true,
  firstName: 'john',
  lastName: 'doe',
  address: '123 office',
  Phone: '123456789'
};

export const loginSuccessResponse = {
  success: true,
  message: 'You are logged in!',
  firstName: user.firstName,
  lastName: user.lastName,
};

export const signupSuccessResponse = {
  success: true,
  message: 'Signup successful!'
};

export const signupFailureResponse = {
  success: false,
  message: 'User already exist!'
};

export const loginFailureResponse = {
  success: false,
  message: 'You are not logged in',
  firstName: '',
  lastName: '',
  token: ''
};

export const userDataOnSuccess = {
  admin: "",
  isLogin: true,
  loginMessage: 'You are logged in!',
  firstName: user.firstName,
  lastName: user.lastName,
  id: "",
};

export const userDataOnFailure = {
  admin: '',
  isLogin: false,
  loginMessage: 'You are not logged in',
  firstName: '',
  lastName: '',
  id: '',
  expire: ''
};
