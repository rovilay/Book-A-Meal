const jwt = require('jsonwebtoken');

require('dotenv').config();

function getToken(user) {
  const token = jwt.sign({ user }, process.env.SECRET, { expiresIn: '24h' });
  return token;
}

export default getToken;
