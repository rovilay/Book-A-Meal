'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _index = require('../../models/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var checkTime = function () {
  function checkTime() {
    _classCallCheck(this, checkTime);
  }

  _createClass(checkTime, null, [{
    key: 'canUpdate',
    value: function canUpdate(req, res, next) {
      _index2.default.Order.findOne({
        where: {
          id: req.params.id
        },
        attributes: ['id', 'createdAt']
      }).then(function (found) {
        var _ref = [found.dataValues.createdAt],
            createdAt = _ref[0]; // Get the time created

        var timeCheck = (0, _moment2.default)(createdAt).add(2, 'hours') > (0, _moment2.default)(); // compare expiry time with present time
        if (timeCheck) {
          return next();
        }
        return res.status(403).send({
          success: false,
          message: "You can't modify order anymore"
        });
      }).catch(function (err) {
        return res.send(err);
      });
    }
  }, {
    key: 'canOrder',
    value: function canOrder(req, res, next) {
      // Can only place order between 7 a.m. to 6 p.m.
      if ((0, _moment2.default)().hour() >= 7 && (0, _moment2.default)().hour() <= 18) {
        return next();
      }

      return res.status(403).send({
        success: false,
        message: 'it\'s ' + (0, _moment2.default)().format('HH:mm') + ', we are closed for the day, try again tomorrow!'
      });
    }
  }]);

  return checkTime;
}();

exports.default = checkTime;