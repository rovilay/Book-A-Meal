'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require('../../models/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MealsController = function () {
  function MealsController() {
    _classCallCheck(this, MealsController);
  }

  _createClass(MealsController, null, [{
    key: 'getAllMeals',
    value: function getAllMeals(req, res) {
      _index2.default.Meal.findAll().then(function (meal) {
        return res.status(200).send({
          success: true,
          message: 'Meals retrieved successfully',
          meal: meal
        });
      }).catch(function () {
        return res.status(400).send({
          success: false,
          message: 'Error occured while getting all meals'
        });
      });
    }
  }, {
    key: 'getMeal',
    value: function getMeal(req, res) {
      _index2.default.Meal.findById(req.params.id).then(function (meal) {
        if (meal === null) {
          return res.status(404).send({
            success: false,
            message: 'Meal not found!'
          });
        }

        return res.status(200).send({
          success: true,
          message: 'Meal retrieved successfully',
          meal: meal
        });
      }).catch(function () {
        return res.status(400).send({
          success: false,
          message: 'Error occured while getting meal'
        });
      });
    }
  }, {
    key: 'addMeal',
    value: function addMeal(req, res) {
      var newMeal = req.body;
      newMeal.title = newMeal.title.toUpperCase();
      newMeal.UserId = req.user.id;

      _index2.default.Meal.create(newMeal).then(function (meal) {
        res.status(201).send({
          success: true,
          message: 'Meal added successfully',
          meal: meal
        });
      }).catch(function () {
        res.status(400).send({
          success: false,
          message: 'Error occured  while creating meal'
        });
      });
    }
  }, {
    key: 'updateMeal',
    value: function updateMeal(req, res) {
      var updatedMeal = req.body;
      updatedMeal.title.toUpperCase();
      updatedMeal.UserId = req.user.id;

      _index2.default.Meal.update(updatedMeal, {
        where: {
          id: req.params.id
        }
      }).then(function (update) {
        if (update) {
          res.status(200).send({
            success: true,
            message: 'Update successful',
            updatedMeal: updatedMeal
          });
        }
      }).catch(function () {
        return res.status(400).send({
          success: false,
          message: 'Error occured  while updating meal'
        });
      });
    }
  }, {
    key: 'deleteMeal',
    value: function deleteMeal(req, res) {
      _index2.default.Meal.destroy({
        where: {
          id: req.params.id
        }
      }).then(function () {
        return res.status(204).send('Delete successful');
      }).catch(function () {
        return res.status(400).send('error occured while deleting');
      });
    }
  }]);

  return MealsController;
}();

exports.default = MealsController;