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
  const bearerToken = req.headers.authorization;

  if (bearerToken && bearerToken.split(' ')[0] === 'Bearer') {
    const token = bearerToken.split(' ')[1];
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
      message: 'Token is undefined or invalid!'
    });
  }
}

export default verifyToken;
