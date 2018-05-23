'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

/**
 * Checks if meal is in db
 *
 * @param  {Array} Meals - List of meals to check db against
 * @param  {object} next - next object to handle error
 * @return {boolean} true
 */

var checkMeals = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(Meals, next) {
    var result, ids;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _index2.default.Meal.findAll({
              where: { id: Meals },
              attributes: ['id']
            });

          case 3:
            result = _context.sent;
            ids = [];

            result.forEach(function (resp) {
              ids.push(resp.id);
            });
            Meals.forEach(function (meal) {
              if (ids.includes(meal) === false) {
                var err = new Error('meal with id: ' + meal + ', not found!');
                err.status = 404;
                throw err;
              }
            });

            return _context.abrupt('return', true);

          case 10:
            _context.prev = 10;
            _context.t0 = _context['catch'](0);
            return _context.abrupt('return', next(_context.t0));

          case 13:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 10]]);
  }));

  return function checkMeals(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var _index = require('../../models/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = checkMeals;