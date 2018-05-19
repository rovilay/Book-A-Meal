'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
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
var myErrorHandler = function myErrorHandler(err, req, res, next) {
  var env = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : process.env.NODE_ENV;

  if (err.name === 'SequelizeUniqueConstraintError') {
    var message = [];
    err.errors.forEach(function (error) {
      message.push(error.path + ' "' + err.value + '"  already exists');
    });
    return res.status(409).json({
      success: false,
      message: message
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

exports.default = myErrorHandler;