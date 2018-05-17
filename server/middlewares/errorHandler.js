/* eslint no-unused-vars: 0 */

/**
 * Handles validation and application errors in both development and test
 * environament
 *
 * @static
 * @param  {object} err - err object
 * @param  {object} req - Request object
 * @param  {object} res - Response object
 * @param  {object} next - nex object (for handling errors or moving to next
 * middleware)
 * @return {json} res.json
 * @memberof User
 */
const myErrorHandler = (err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message,
    err

  });
};


export default myErrorHandler;
