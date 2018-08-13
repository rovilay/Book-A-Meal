/* eslint no-unused-expressions: 0 */
import validator from 'validator';

const loginValidator = ({ email, password }) => {
  let inValid;

  (email && validator.isEmail(email)) ? inValid = '' : inValid = 'email is invalid';

  if (inValid === '' && !password) {
    inValid = 'password field is empty';
  }

  if (inValid === '') {
    return 'Login';
  }

  return inValid;
};

export default loginValidator;
