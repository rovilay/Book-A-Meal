'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateMenu = validateMenu;
exports.validateUpdateMenu = validateUpdateMenu;
exports.validateParams = validateParams;

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
function validateMenu(req, res, next) {
  var keys = ['postOn', 'meals'];

  keys.forEach(function (key) {
    // check if undefined or empty
    if (req.body['' + key] === undefined || req.body['' + key] === '') {
      var err = new Error(key + ' field is empty');
      err.status = 400;
      return next(err);
    }
  });

  if ((0, _moment2.default)(req.body.postOn, 'YYYY-MM-DD', true).isValid() === false) {
    var err = new Error('postOn input is invalid');
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
function validateUpdateMenu(req, res, next) {
  var key = 'meals';
  if (req.body['' + key] === undefined || req.body['' + key] === '') {
    var err = new Error(key + ' field is empty');
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
function validateParams(req, res, next) {
  if (req.params.DD && req.params.MM && req.params.YYYY) {
    var day = req.params.DD;
    var month = req.params.MM;
    var year = req.params.YYYY;
    var date = year + '-' + month + '-' + day;

    if ((0, _moment2.default)(date, 'YYYY-MM-DD', true).isValid() === false) {
      var err = new Error("'/DD/MM/YYYY' parameters is invalid!'");
      err.status = 400;
      return next(err);
    }
  }

  return next();
}