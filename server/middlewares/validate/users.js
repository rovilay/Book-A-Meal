class User {
  static login(req, res, next) {
    const keys = ['email', 'password'];
    keys.forEach((key) => {
      // check if undefined or empty
      if (req.body[`${key}`] === undefined || req.body[`${key}`] === '') {
        return res.status(400).end(`${key} field is empty`);
      }
    });
    next();
  }

  static signup(req, res, next) {
    const keys = ['firstName', 'lastName', 'email', 'password', 'address', 'Phone', 'city', 'state'];

    keys.forEach((key) => {
      // check if undefined or empty
      if (req.body[`${key}`] === undefined || req.body[`${key}`] === '') {
        return res.status(400).end(`${key} field is empty`);
      }
    });

    return next();
  }
}

export default User;
