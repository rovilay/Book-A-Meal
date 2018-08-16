/* eslint no-restricted-globals: 0 */
import moment from 'moment';
import validator from 'validator';

/**
 *
 * Validate request queries
 *
 * @export validateParams
 * @param  {object} req - Request object
 * @param  {object} res - Response object
 * @param  {object} next - next object (handles error or continues to next
 * middleware)
 * @return {object} next
 */
export default function validateQuery(req, res, next) {
  const {
    // postOn,
    limit,
    offset,
    // id
  } = req.query;

  // check if not a number or check for negative numbers
  if ((limit && isNaN(limit)) || (limit && Math.ceil(limit) < 1)) {
    const err = new Error('limit must be a number and greater than 0!');
    err.status = 400;
    return next(err);
  }

  if ((offset && isNaN(offset)) || (offset && Math.ceil(offset) < 0)) {
    const err = new Error('Offset query must be a number and not be less than 0!');
    err.status = 400;
    return next(err);
  }

  return next();
}
