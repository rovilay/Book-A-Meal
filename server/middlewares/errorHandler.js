/* eslint no-unused-vars: 0 */
require('dotenv').config();

/**
 * Handles validation and application errors in depending on node environment
 *
 * @static
 * @param  {object} err - err object
 * @param  {object} req - Request object
 * @param  {object} res - Response object
 * @param  {string} env - current node environment
 * @param  {object} next - nex object (for handling errors or moving to next
 * middleware)
 * @return {json} res.json
 * @memberof User
 */
const myErrorHandler = (err, req, res, next, env = process.env.NODE_ENV) => {
  if (err.name === 'SequelizeUniqueConstraintError') {
    const message = [];
    err.errors.forEach((error) => {
      message.push(`${error.path} "${err.value}"  already exists`);
    });
    return res.status(409).json({
      success: false,
      message
    });
  }

  if (env === 'production') {
    res.status(err.status || 500).json({
      success: false,
      message: err.message
    });
  }

  res.status(err.status || 500).json({
    success: false,
    message: err.message,
    error: err.errors
  });
};


export default myErrorHandler;
