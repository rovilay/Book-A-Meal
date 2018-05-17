/**
 * Validates login and signup inputs
 *
 * @exports User
 * @class User
 */
class User {
  /**
   * Validates sent login inputs
   *
   * @static
   * @param  {object} req - Request object
   * @param  {object} res - Response object
   * @param  {object} next - nex object (for handling errors or moving to next
   * middleware)
   * @return {object} next
   * @memberof User
   */
  static login(req, res, next) {
    const keys = ['email', 'password'];
    keys.forEach((key) => {
      // check if undefined or empty
      if (req.body[`${key}`] === undefined || req.body[`${key}`] === '') {
        const err = new Error(`${key} field is empty`);
        err.status = 400;
        return next(err);
      }
    });
    return next();
  }

  /**
   * Validates sent signup inputs
   *
   * @static
   * @param  {object} req - Request object
   * @param  {object} res - Response object
   * @param  {object} next - nex object (for handling errors or moving to next
   * middleware)
   * @return {object} next
   * @memberof User
   */
  static signup(req, res, next) {
    const keys = ['firstName', 'lastName', 'email', 'password', 'address', 'Phone', 'city', 'state'];

    keys.forEach((key) => {
      // check if undefined or empty
      if (req.body[`${key}`] === undefined || req.body[`${key}`] === '') {
        const err = new Error(`${key} field is empty`);
        err.status = 400;
        return next(err);
      }
    });

    return next();
  }
}

export default User;
