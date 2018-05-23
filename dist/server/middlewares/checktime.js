'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _index = require('../../models/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Restricts user based on time
 *
 * @exports checkTime
 * @class checkTime
 */
var checkTime = function () {
  function checkTime() {
    (0, _classCallCheck3.default)(this, checkTime);
  }

  (0, _createClass3.default)(checkTime, null, [{
    key: 'canUpdate',

    /**
     * Checks time if update is allowed
     * @static
     * @param  {object} req - Request object
     * @param  {object} res - Response object
     * @param  {object} next - nex object (for handling errors or moving to next
     * middleware)
     * @return {object} next
     * @memberof checkTime
     */
    value: function canUpdate(req, res, next) {
      _index2.default.Order.findOne({
        where: {
          id: req.params.id
        },
        attributes: ['id', 'createdAt']
      }).then(function (found) {
        var err = new Error("You can't modify order anymore");
        err.status = 403;
        var _ref = [found.dataValues.createdAt],
            createdAt = _ref[0]; // Get the time created

        var timeCheck = (0, _moment2.default)(createdAt).add(1, 'hour') > (0, _moment2.default)(); // compare expiry time with present time
        if (timeCheck) {
          return next();
        }
        throw err;
      }).catch(function (err) {
        return next(err);
      });
    }

    /**
     * Checks time if order is allowed
     * @static
     * @param  {object} req - Request object
     * @param  {object} res - Response object
     * @param  {object} next - nex object (for handling errors or moving to next
     * middleware)
     * @return {object} next
     * @memberof checkTime
     */

  }, {
    key: 'canOrder',
    value: function canOrder(req, res, next) {
      var err = new Error('it\'s ' + (0, _moment2.default)().format('HH:mm') + ', we are closed for the day, try again tomorrow!');
      err.status = 403;
      // Can only place order between 7 a.m. to 6 p.m.
      if ((0, _moment2.default)().hour() >= 7 && (0, _moment2.default)().hour() <= 18) {
        return next();
      }

      return next(err);
    }
  }]);
  return checkTime;
}();

exports.default = checkTime;