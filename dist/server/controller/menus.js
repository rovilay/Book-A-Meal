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

var _checkMeal = require('../helpers/checkMeal');

var _checkMeal2 = _interopRequireDefault(_checkMeal);

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
      }).then(function (menus) {
        if (menus === null || menus.length === 0) {
          var err = new Error('No menu found!');
          err.status = 404;
          return next(err);
        }

        return res.status(200).send({
          success: true,
          message: 'Menus retrieved successfully',
          menus: menus
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
      (0, _checkMeal2.default)(newMenu.meals, next).then(function (check) {
        if (check === true) {
          _index2.default.Menu.findOrCreate({
            where: { postOn: newMenu.postOn },
            defaults: { UserId: req.user.id }
          }).then(function (menu) {
            if (menu[1] === true) {
              menu[0].addMeals(newMenu.meals).then(function () {
                res.status(201).send({
                  success: true,
                  message: 'Menu posted successfully!'
                });
              }).catch(function (err) {
                return next(err);
              });
            } else {
              var err = new Error('Menu for date: ' + newMenu.postOn + ' have already been posted!');
              err.status = 400;
              throw err;
            }
          }).catch(function (err) {
            return next(err);
          });
        }
      });
    }

    /**
     * Updates Menu  by date
     *
     * @static
     * @param  {object} req - Request object
     * @param  {object} res - Response object
     * @param {function} next - next object (for error handling)
     * @return {json} res.send
     * @memberof MenusController
     */

  }, {
    key: 'updateMenu',
    value: function updateMenu(req, res, next) {
      var updatedMenu = req.body;
      var day = req.params.DD;
      var month = req.params.MM;
      var year = req.params.YYYY;
      var date = year + '-' + month + '-' + day;
      (0, _checkMeal2.default)(updatedMenu.meals, next).then(function (check) {
        if (check === true) {
          _index2.default.Menu.findOne({
            where: { postOn: date },
            attributes: ['id']
          }).then(function (menu) {
            if (menu !== null) {
              _index2.default.MenuMeal.destroy({
                where: {
                  MenuId: menu.id
                }
              });

              updatedMenu.meals.forEach(function (meal) {
                _index2.default.MenuMeal.create({
                  MenuId: menu.id,
                  MealId: meal
                }).catch(function (err) {
                  return next(err);
                });
              });

              res.status(200).send({
                success: true,
                message: 'Menu updated successfully!'
              });
            } else {
              var err = new Error('Menu for date: ' + date + ', not found!');
              err.status = 404;
              throw err;
            }
          }).catch(function (err) {
            return next(err);
          });
        }
      });
    }
  }]);
  return MenusController;
}();

exports.default = MenusController;