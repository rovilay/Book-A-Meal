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
      if (err || userData === undefined) {
        err.status = 401;
        return next(err);
      }

      req.user = userData.user;
      return next();
    });
  } else {
    return res.status(403).json({
      success: false,
      message: 'Token is undefined!'
    });
  }
}

export default verifyToken;
