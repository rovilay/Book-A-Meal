import moment from 'moment';
import validator from 'validator';

/**
 * Validates sent menu inputs
 *
 * @export validateMenu
 * @param  {object} req - Request object
 * @param  {object} res - Response object
 * @param  {object} next - next object (handles error or continues to next
 * middleware)
 * @return {object} next
 */
export function validateMenu(req, res, next) {
  const keys = ['postOn', 'meals'];
  const today = moment().format('YYYY-MM-DD');
  let error;
  keys.forEach((key) => {
    // check if undefined or empty
    if (req.body[`${key}`] === undefined || req.body[`${key}`] === '') {
      error = new Error(`${key} field is empty!`);
      error.status = 400;
      return next(error);
    }
  });

  if (!moment(req.body.postOn, 'YYYY-MM-DD', true).isValid()) {
    error = new Error(`${req.body.postOn} is invalid or in wrong format.`);
    error.status = 400;
    return next(error);
  }

  if (moment(req.body.postOn, 'YYYY-MM-DD').isBefore(today)) {
    error = new Error(`you can't post menu on this date: ${req.body.postOn} anymore!`);
    error.status = 400;
    return next(error);
  }

  return next();
}

/**
 * Validate add meal to menu;
 *
 * @export validateUpdateMenu
 * @param  {object} req - Request object
 * @param  {object} res - Response object
 * @param  {object} next - next object (handles error or continues to next
 * middleware)
 * @return {object} next
 */
export function validateAddMealToMenu(req, res, next) {
  const key = 'meals';
  if (req.body[`${key}`] === undefined || req.body[`${key}`] === '' || req.body[`${key}`].length === 0) {
    const error = new Error(`${key} field is empty!`);
    error.status = 400;
    return next(error);
  }

  return next();
}

/**
 * Validate menuId on request parameters(../:date)
 *
 * @export validateParams
 * @param  {object} req - Request object
 * @param  {object} res - Response object
 * @param  {object} next - next object (handles error or continues to next
 * middleware)
 * @return {object} next
 */
export function validateParams(req, res, next) {
  const { menuId } = req.params;
  if (!validator.isUUID(menuId, 4)) {
    const error = new Error('menuId is incorrect!');
    error.status = 400;
    return next(error);
  }

  return next();
}
