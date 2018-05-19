'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();

function getToken(req, res, next) {
  // Get auth header from req header
  var token = req.headers.authorization;

  if (token !== undefined) {
    // verify token
    _jsonwebtoken2.default.verify(token, process.env.SECRET, function (err, userData) {
      req.user = userData.user;
      if (err) {
        res.status(400).send({
          success: false,
          message: 'Error verifying token'
        });
      }
      next();
    });
  } else {
    return res.sendStatus(403);
  }
}

exports.default = getToken;