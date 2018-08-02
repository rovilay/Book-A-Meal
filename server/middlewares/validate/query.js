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
    postOn,
    limit,
    offset,
    id
  } = req.query;

  if ((limit && isNaN(limit)) || (offset && isNaN(offset))) {
    const err = new Error('limit or offset query must be a number!');
    err.status = 400;
    return next(err);
  }

  if (postOn && !moment(postOn, 'YYYY-MM-DD', true).isValid()) {
    const err = new Error(`${postOn} is invalid!, date should be in "YYYY-MM-DD" format!`);
    err.status = 400;
    return next(err);
  }

  if (id && !validator.isUUID(id, 4)) {
    const err = new Error(`${id} is not in a valid format!`);
    err.status = 400;
    return next(err);
  }

  return next();
}
