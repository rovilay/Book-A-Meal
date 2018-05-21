/**
 * Validates sent menu inputs
 *
 * @export validatemenu
 * @param  {object} req - Request object
 * @param  {object} res - Response object
 * @param  {object} next - next object (handles error or continues to next
 * middleware)
 * @return {object} next
 */
export function validateMenu(req, res, next) {
  const keys = ['postOn', 'meals'];

  keys.forEach((key) => {
    // check if undefined or empty
    if (req.body[`${key}`] === undefined || req.body[`${key}`] === '') {
      const err = new Error(`${key} field is empty`);
      err.status = 400;
      return next(err);
    }
  });
  return next();
}

/**
 * Validate menu update inputs
 *
 * @export validateUpdateMenu
 * @param  {object} req - Request object
 * @param  {object} res - Response object
 * @param  {object} next - next object (handles error or continues to next
 * middleware)
 * @return {object} next
 */
export function validateUpdateMenu(req, res, next) {
  const key = 'meals';
  if (req.body[`${key}`] === undefined || req.body[`${key}`] === '') {
    const err = new Error(`${key} field is empty`);
    err.status = 400;
    return next(err);
  }

  return next();
}

