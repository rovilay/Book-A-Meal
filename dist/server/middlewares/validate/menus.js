'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Validates sent menu inputs
 *
 * @exports validatemenu
 * @param  {object} req - Request object
 * @param  {object} res - Response object
 * @param  {object} next - next object (handles error or continues to next
 * middleware)
 * @return {object} next
 */
function validatemenu(req, res, next) {
  var keys = ['postOn', 'meals'];

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

exports.default = validatemenu;