'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Validates sent Meal inputs
 *
 * @exports validatemeal
 * @param  {object} req - Request object
 * @param  {object} res - Response object
 * @param  {object} next - next object (handles error or continues to next
 * middleware)
 * @return {object} next
 */

function validatemeal(req, res, next) {
  var keys = ['title', 'description', 'price'];

  keys.forEach(function (key) {
    // check if undefined or empty
    if (req.body['' + key] === undefined || req.body['' + key] === '') {
      var err = new Error(key + ' field is empty');
      err.status = 400;
      return next(err);
    }
  });
  return next();
}

exports.default = validatemeal;