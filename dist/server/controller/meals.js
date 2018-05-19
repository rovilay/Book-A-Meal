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
 * Handles operations on Meal routes
 *
 * @exports
 * @class MealsController
 */
var MealsController = function () {
  function MealsController() {
    (0, _classCallCheck3.default)(this, MealsController);
  }

  (0, _createClass3.default)(MealsController, null, [{
    key: 'getAllMeals',

    /**
     * Gets all meals
     *
     * @static
     * @param  {object} req - Request object
     * @param  {object} res - Response object
     * @param {function} next - next object (for error handling)
     * @return {json} res.send
     * @memberof MealsController
     */
    value: function getAllMeals(req, res, next) {
      _index2.default.Meal.findAll().then(function (meals) {
        return res.status(200).send({
          success: true,
          message: 'Meals retrieved successfully',
          meals: meals
        });
      }).catch(function () {
        var err = new Error('Error occurred while getting all meals!');
        err.status = 400;
        return next(err);
      });
    }

    /**
     * Gets a single meal based on id
     *
     * @static
     * @param  {object} req - Request object
     * @param  {object} res - Response object
     * @param {function} next - next object (for error handling)
     * @return {json} res.send
     * @memberof MealsController
     */

  }, {
    key: 'getMeal',
    value: function getMeal(req, res, next) {
      _index2.default.Meal.findById(req.params.id).then(function (meal) {
        if (meal === null) {
          var err = new Error('Meal not found!');
          err.status = 404;
          return next(err);
        }

        return res.status(200).send({
          success: true,
          message: 'Meal retrieved successfully',
          meal: meal
        });
      }).catch(function (err) {
        err = new Error('Error occurred while getting meal!');
        err.status = 400;
        return next(err);
      });
    }

    /**
     * Creates a meal
     *
     * @static
     * @param  {object} req - Request object
     * @param  {object} res - Response object
     * @param {function} next - next object (for error handling)
     * @return {json} res.send
     * @memberof MealsController
     */

  }, {
    key: 'addMeal',
    value: function addMeal(req, res, next) {
      var newMeal = req.body;
      newMeal.title = newMeal.title.toUpperCase();
      newMeal.UserId = req.user.id;

      _index2.default.Meal.create(newMeal).then(function (meal) {
        res.status(201).send({
          success: true,
          message: 'Meal added successfully',
          meal: meal
        });
      }).catch(function (err) {
        err = new Error('Error occurred while posting meal!');
        err.status = 400;
        return next(err);
      });
    }

    /**
     * Updates meal based on specified id
     *
     * @static
     * @param  {object} req - Request object
     * @param  {object} res - Response object
     * @param {function} next - next object (for error handling)
     * @return {json} res.send
     * @memberof MealsController
     */

  }, {
    key: 'updateMeal',
    value: function updateMeal(req, res, next) {
      var updatedMeal = req.body;
      updatedMeal.title = updatedMeal.title.toUpperCase();
      updatedMeal.UserId = req.user.id;

      _index2.default.Meal.update(updatedMeal, {
        where: {
          id: req.params.id
        }
      }).then(function (update) {
        if (update) {
          res.status(200).send({
            success: true,
            message: 'Update successful!',
            updatedMeal: updatedMeal
          });
        }
      }).catch(function (err) {
        err = new Error('Error occurred while updating meal!');
        err.status = 400;
        return next(err);
      });
    }

    /**
     * Deletes meal based on specified meal id
     *
     * @static
     * @param  {object} req - Request object
     * @param  {object} res - Response object
     * @param  {function} next - next object (for error handling)
     * @return {json} res.send
     * @memberof MealsController
     */

  }, {
    key: 'deleteMeal',
    value: function deleteMeal(req, res, next) {
      _index2.default.Meal.destroy({
        where: {
          id: req.params.id
        }
      }).then(function () {
        return res.status(204).send('Delete successful');
      }).catch(function (err) {
        err = new Error('Error occurred while deleting meal!');
        err.status = 400;
        return next(err);
      });
    }
  }]);
  return MealsController;
}();

exports.default = MealsController;