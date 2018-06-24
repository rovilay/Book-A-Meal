/**
 * checks if required signup form fields are empty,
 * also checks if password and confirm password matches
 */
const signupValidator = () => {
  let valid = true;
  const requiredFields = [
    'signup-fname',
    'signup-lname',
    'signup-email',
    'signup-role',
    'signup-phone',
    'signup-address',
    'signup-psw',
    'signup-cpsw',
    'signup-city',
    'signup-state',
  ].map(field => document.getElementById(field).value);

  if (requiredFields.includes('')) {
    valid = false;
  }

  if (valid && (requiredFields[6] !== requiredFields[7])) {
    valid = false;
  }

  return valid;
};

export default signupValidator;
