'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _index = require('../../models/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Handles operations on menu routes
 *
 * @exports
 * @class MenusController
 */
var MenusController = function () {
  function MenusController() {
    (0, _classCallCheck3.default)(this, MenusController);
  }

  (0, _createClass3.default)(MenusController, null, [{
    key: 'getAllMenus',

    /**
     * Gets all menus
     *
     * @static
     * @param  {object} req - Request object
     * @param  {object} res - Response object
     * @param {function} next - next object (for error handling)
     * @return {json} res.send
     * @memberof MenusController
     */
    value: function getAllMenus(req, res, next) {
      _index2.default.Menu.findAll({
        include: [{
          model: _index2.default.User,
          attributes: ['firstName', 'lastName']
        }, {
          model: _index2.default.Meal,
          attributes: ['id', 'title', 'price'],
          through: {
            attributes: ['id']
          }
        }]
      }).then(function (menu) {
        return res.status(200).send({
          success: true,
          message: 'Menus retrieved successfully',
          menus: menu
        });
      }).catch(function (err) {
        err = new Error('Error occurred while getting all menus!');
        err.status = 400;
        return next(err);
      });
    }

    /**
     * Gets a menu based on "post On" date
     *
     * @static
     * @param  {object} req - Request object
     * @param  {object} res - Response object
     * @param {function} next - next object (for error handling)
     * @return {json} res.send
     * @memberof MenusController
     */

  }, {
    key: 'getMenu',
    value: function getMenu(req, res, next) {
      var day = req.params.DD;
      var month = req.params.MM;
      var year = req.params.YYYY;
      var date = year + '-' + month + '-' + day;

      _index2.default.Menu.findAll({
        include: [{
          model: _index2.default.User,
          attributes: ['firstName', 'lastName']
        }, {
          model: _index2.default.Meal,
          attributes: ['id', 'title', 'price'],
          through: {
            attributes: ['id']
          }
        }],
        where: {
          postOn: date
        }
      }).then(function (menu) {
        if (menu.length === 0) {
          var err = new Error('Could not get menu on date: ' + date);
          err.status = 404;
          return next(err);
        }
        res.status(200).send({
          success: true,
          message: 'Menu retrieved successfully',
          menu: menu
        });
      }).catch(function (err) {
        err = new Error('Error occurred while getting menu!');
        err.status = 400;
        return next(err);
      });
    }

    /**
     * Posts menu for a specified date
     *
     * @static
     * @param  {object} req - Request object
     * @param  {object} res - Response object
     * @param {function} next - next object (for error handling)
     * @return {json} res.send
     * @memberof MenusController
     */

  }, {
    key: 'postMenu',
    value: function postMenu(req, res, next) {
      var newMenu = req.body;

      _index2.default.Menu.create({
        UserId: req.user.id,
        postOn: newMenu.postOn
      }).then(function (menu) {
        menu.addMeals(newMenu.meals).then(function () {
          res.status(200).send({
            success: true,
            message: 'Menu posted successfully!'
          });
        }).catch(function (err) {
          return next(err);
        });
      }).catch(function (err) {
        err = new Error('Error occurred while posting menu!');
        err.status = 400;
        return next(err);
      });
    }
  }]);
  return MenusController;
}();

exports.default = MenusController;