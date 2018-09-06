import db from '../../models';
import paginate from '../helpers/paginate';

/**
 * Handles operations on Meal routes
 *
 * @exports
 * @class MealsController
 */
class MealsController {
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
  static getAllMeals(req, res, next) {
    const { id: UserId } = req.user;
    let { limit, offset } = req.query;
    limit = Math.ceil(limit) || 10;
    offset = Math.ceil(offset) || 0;

    db.Meal.findAndCountAll({
      limit,
      offset,
      order: [['title']],
      where: { UserId }
    })
      .then((response) => {
        const { count, rows: meals } = response;
        res.status(200).send({
          success: true,
          message: 'Meals retrieved successfully!',
          pagination: paginate(limit, offset, count),
          meals
        });
      })
      .catch(error => next(error));
  }

  /**
   * Gets a single meal based on meal id
   *
   * @static
   * @param  {object} req - Request object
   * @param  {object} res - Response object
   * @param {function} next - next object (for error handling)
   * @return {json} res.send
   * @memberof MealsController
   */
  static getMeal(req, res, next) {
    const { id: UserId } = req.user;
    const { mealId } = req.params;
    db.Meal.findById(mealId, {
      where: { UserId }
    })
      .then((meal) => {
        if (meal === null || meal.UserId !== UserId) {
          const error = new Error('Meal not found!');
          error.status = 404;
          return next(error);
        }

        return res.status(200).send({
          success: true,
          message: 'Meal retrieved successfully!',
          meal,
        });
      })
      .catch((error) => {
        error = new Error('Error occurred while getting meal!');
        error.status = 500;
        return next(error);
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
  static addMeal(req, res, next) {
    const newMeal = req.body;
    newMeal.title = newMeal.title.toUpperCase();
    newMeal.UserId = req.user.id;

    db.Meal.create(newMeal)
      .then((meal) => {
        res.status(201).send({
          success: true,
          message: 'Meal added successfully!',
          meal,
        });
      })
      .catch((error) => {
        error = new Error('Error, Meal already exist!');
        error.status = 409;
        return next(error);
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
  static updateMeal(req, res, next) {
    const { id: UserId } = req.user;
    const { mealId } = req.params;
    const updatedMeal = req.body;
    updatedMeal.title = updatedMeal.title.toUpperCase();
    updatedMeal.UserId = req.user.id;

    db.Meal.update(updatedMeal, {
      where: {
        id: mealId,
        UserId
      },
    })
      .then((update) => {
        // update is an array of a single 0 or 1: [0] or [1]
        if (update[0]) {
          res.status(200).send({
            success: true,
            message: 'Update successful!',
            updatedMeal,
          });
        } else {
          const error = new Error('Meal not found!');
          error.status = 404;
          return next(error);
        }
      })
      .catch((error) => {
        error = new Error('Error occurred while updating meal!');
        error.status = 500;
        return next(error);
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
  static deleteMeal(req, res, next) {
    const { id: UserId } = req.user;
    const { mealId } = req.params;
    db.Meal.destroy({
      where: {
        id: mealId,
        UserId,
        deletedAt: new Date('2100')
      },
    })
      .then((deleted) => {
        if (deleted) {
          return res.status(204).send('Delete successful!');
        }
        const error = new Error('Meal not found!');
        error.status = 404;
        return next(error);
      })
      .catch((error) => {
        error = new Error('Error occurred while deleting meal!');
        error.status = 500;
        return next(error);
      });
  }
}

export default MealsController;
