const jwt = require('jsonwebtoken');

require('dotenv').config();

/**
 * Gets token for test cases
 *
 * @export getToken
 * @param  {object} user - object containing user information
 * @return {string} token - a token string
 */
function getToken(user) {
  const token = jwt.sign({ user }, process.env.SECRET, { expiresIn: '24h' });
  return token;
}

export default getToken;
