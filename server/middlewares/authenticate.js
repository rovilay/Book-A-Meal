import jwt from 'jsonwebtoken';

require('dotenv').config();

function getToken(req, res, next) {
  // Get auth header from req header
  const token = req.headers.authorization;

  if (token !== undefined) {
    // verify token
    jwt.verify(token, process.env.SECRET, (err, userData) => {
      req.user = userData.user;
      if (err) {
        res.status(400).send({
          success: false,
          message: 'Error verifying token',
        });
      }
      next();
    });
  } else {
    return res.sendStatus(403);
  }
}

export default getToken;
