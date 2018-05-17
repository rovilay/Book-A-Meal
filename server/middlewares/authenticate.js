import jwt from 'jsonwebtoken';

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
  const token = req.headers.authorization;

  if (token !== undefined) {
    // verify token
    jwt.verify(token, process.env.SECRET, (err, userData) => {
      req.user = userData.user;
      if (err) {
        err.status = 401;
        return next(err);
      }

      return next();
    });
  } else {
    return res.sendStatus(403);
  }
}

export default verifyToken;
