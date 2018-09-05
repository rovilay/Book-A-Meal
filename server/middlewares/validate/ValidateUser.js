/**
 * Validates login and signup inputs
 *
 * @exports ValidateUser
 * @class ValidateUser
 */
class ValidateUser {
  /**
   * Validates sent login inputs
   *
   * @static
   * @param  {object} req - Request object
   * @param  {object} res - Response object
   * @param  {object} next - nex object (for handling errors or moving to next
   * middleware)
   * @return {object} next
   * @memberof ValidateUser
   */
  static login(req, res, next) {
    const keys = ['email', 'password'];
    keys.forEach((key) => {
      // check if undefined or empty
      if (req.body[`${key}`] === undefined || req.body[`${key}`] === '') {
        const error = new Error(`${key} field is empty`);
        error.status = 400;
        return next(error);
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
   * @param  {object} next - nex object (for handling errorors or moving to next
   * middleware)
   * @return {object} next
   * @memberof ValidateUser
   */
  static signup(req, res, next) {
    const keys = ['firstName', 'lastName', 'email', 'password', 'address', 'Phone', 'city', 'state'];

    keys.forEach((key) => {
      // check if undefined or empty
      if (req.body[`${key}`] === undefined || req.body[`${key}`] === '') {
        const error = new Error(`${key} field is empty`);
        error.status = 400;
        return next(error);
      }
    });

    return next();
  }
}

export default ValidateUser;
