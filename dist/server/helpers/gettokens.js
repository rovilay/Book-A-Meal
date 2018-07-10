'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var jwt = require('jsonwebtoken');

require('dotenv').config();

/**
 * Gets token for test cases
 *
 * @export getToken
 * @param  {object} user - object containing user information
 * @return {string} token - a token string
 */
function getToken(user) {
  var id = user.id,
      admin = user.admin;

  var token = jwt.sign({ id: id, admin: admin }, process.env.SECRET, { expiresIn: '24h' });
  return token;
}

exports.default = getToken;