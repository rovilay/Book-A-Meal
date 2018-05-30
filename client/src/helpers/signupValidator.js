const signupValidator = ({
  firstName,
  lastName,
  email,
  Phone,
  address,
  password,
  cpassword,
  city,
  state
}) => {
  let valid = true;

  const requiredFields = Object.values({
    firstName,
    lastName,
    email,
    Phone,
    address,
    password,
    cpassword,
    city,
    state
  });

  if (requiredFields.includes('')) {
    valid = false;
  }

  // console.log(cpassword, password)
  // if (valid && cpassword !== password) {
  //   valid = false;
  // }

  // if ( !!valid && (cpassword === password)) {
  //   valid = true;
  // }

  return valid;
};

export default signupValidator;
