/* eslint no-restricted-globals:0 */
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
    limit,
    offset
  } = req.query;

  // check if not a number or check for negative numbers
  if ((limit && isNaN(limit)) || (limit && Math.ceil(limit) < 1)) {
    const error = new Error('limit must be a number and greater than 0!');
    error.status = 400;
    return next(error);
  }

  if ((offset && isNaN(offset)) || (offset && Math.ceil(offset) < 0)) {
    const error = new Error('Offset query must be a number and not be less than 0!');
    error.status = 400;
    return next(error);
  }

  return next();
}
