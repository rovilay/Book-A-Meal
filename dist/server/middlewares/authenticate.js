'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();
/**
 * Verifies token
 *
 * @exports verifyToken
 * @param  {object} req - Request object
 * @param  {object} res - Response object
 * @param  {object} next - next object (handles error or continues to next
 * middleware)
 * @return {object} next
 */
function verifyToken(req, res, next) {
  // Get auth header from req header
  var bearerToken = req.headers.authorization;

  if (bearerToken && bearerToken.split(' ')[0] === 'Bearer') {
    var token = bearerToken.split(' ')[1];
    // verify token
    _jsonwebtoken2.default.verify(token, process.env.SECRET, function (err, userData) {
      if (err || userData === undefined) {
        err.status = 403;
        return next(err);
      }

      req.user = userData.user;
      return next();
    });
  } else {
    return res.status(403).json({
      success: false,
      message: 'Token is undefined or invalid!'
    });
  }
}

exports.default = verifyToken;