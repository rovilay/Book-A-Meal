import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Authorizes requests by verifying token
 *
 * @exports authorize
 * @param  {object} req - Request object
 * @param  {object} res - Response object
 * @param  {object} next - next object (handles error or continues to next
 * middleware)
 * @return {object} next
 */
function authorize(req, res, next) {
  // Get auth header from req header
  const bearerToken = req.headers.authorization;

  if (bearerToken && bearerToken.split(' ')[0] === 'Bearer') {
    const token = bearerToken.split(' ')[1];
    // verify token
    jwt.verify(token, process.env.SECRET, (error, userData) => {
      if (error || userData === undefined) {
        error.status = 401;
        return next(error);
      }

      req.user = { ...userData };
      return next();
    });
  } else {
    return res.status(400).json({
      success: false,
      message: 'Token is required!'
    });
  }
}

export default authorize;
