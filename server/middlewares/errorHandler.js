/* eslint no-unused-vars: 0 */
require('dotenv').config();

/**
 * Handles validation and application errors in depending on node environment
 *
 * @static
 * @param  {object} error - error object
 * @param  {object} req - Request object
 * @param  {object} res - Response object
 * @param  {string} env - current node environment
 * @param  {object} next - nex object (for handling errorors or moving to next
 * middleware)
 * @return {json} res.json
 * @memberof User
 */
const errorHandler = (error, req, res, next, env = process.env.NODE_ENV) => {
  if (error.name === 'SequelizeUniqueConstraintError') {
    const message = [];
    error.errors.forEach((err) => {
      message.push(`${err.path} "${err.value}"  already exists`);
    });
    return res.status(409).json({
      success: false,
      message
    });
  }

  if (env === 'production') {
    res.status(error.status || 500).json({
      success: false,
      message: error.message
    });
  }

  res.status(error.status || 500).json({
    success: false,
    message: error.message,
    error: error.errors
  });
};


export default errorHandler;
