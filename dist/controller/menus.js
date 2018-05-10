'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require('../models/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MenusController = function () {
  function MenusController() {
    _classCallCheck(this, MenusController);
  }

  _createClass(MenusController, null, [{
    key: 'getAllMenus',
    value: function getAllMenus(req, res) {
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
      }).catch(function () {
        return res.status(400).send({
          success: false,
          message: 'Error occured while getting all menus'
        });
      });
    }
  }, {
    key: 'getMenu',
    value: function getMenu(req, res) {
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
        return res.status(200).send({
          success: true,
          message: 'Menu retrieved successfully',
          menu: menu
        });
      }).catch(function () {
        return res.status(400).send({
          success: false,
          message: 'Error occured while getting menu'
        });
      });
    }
  }, {
    key: 'postMenu',
    value: function postMenu(req, res) {
      var newMenu = req.body;

      _index2.default.Menu.create({
        UserId: req.user.id,
        postOn: newMenu.postOn
      }).then(function (menu) {
        menu.addMeals(newMenu.meals);
        res.status(200).send({
          success: true,
          message: 'Menu posted successfully!'
        });
      }).catch(function () {
        res.status.send({
          success: false,
          message: 'Error occured while posting menu'
        });
      });
    }
  }]);

  return MenusController;
}();

exports.default = MenusController;