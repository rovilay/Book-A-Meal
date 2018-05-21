import moment from 'moment';

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

  if (!moment(req.body.postOn, 'YYYY-MM-DD', true).isValid()) {
    const err = new Error('postOn input is invalid');
    err.status = 400;
    return next(err);
  }


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

/**
 * Validate date on request parameters(../:DD/:MM/:YYYY)
 *
 * @export validateParams
 * @param  {object} req - Request object
 * @param  {object} res - Response object
 * @param  {object} next - next object (handles error or continues to next
 * middleware)
 * @return {object} next
 */
export function validateParams(req, res, next) {
  if (req.params.DD && req.params.MM && req.params.YYYY) {
    const day = req.params.DD;
    const month = req.params.MM;
    const year = req.params.YYYY;
    const date = `${year}-${month}-${day}`;

    if (moment(date, 'YYYY-MM-DD', true).isValid() === false) {
      const err = new Error("'/DD/MM/YYYY' parameters is invalid!'");
      err.status = 400;
      return next(err);
    }
  }

  return next();
}

