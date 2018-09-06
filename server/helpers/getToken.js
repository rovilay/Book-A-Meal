import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Gets token for test cases
 *
 * @export getToken
 * @param  {object} user - object containing user information
 * @return {string} token - a token string
 */
function getToken(user) {
  const { id, admin } = user;
  const token = jwt.sign({ id, admin }, process.env.SECRET, { expiresIn: '24h' });
  return token;
}

export default getToken;
