/* eslint no-unused-expressions: 0 */
import validator from 'validator';

const loginValidator = ({ email, password }) => {
  let valid;

  (email && validator.isEmail(email)) ? valid = '' : valid = 'email is invalid';

  if (valid === '' && !password) {
    valid = 'password field is empty';
  }

  if (valid === '') {
    return 'Login';
  }

  return valid;
};

export default loginValidator;
