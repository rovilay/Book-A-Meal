import db from '../../models/index';

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
    db.Meal.findAll()
      .then(meals => res.status(200).send({
        success: true,
        message: 'Meals retrieved successfully',
        meals,
      }))
      .catch(() => {
        const err = new Error('Error occurred while getting all meals!');
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
  static getMeal(req, res, next) {
    db.Meal.findById(req.params.id)
      .then((meal) => {
        if (meal === null) {
          const err = new Error('Meal not found!');
          err.status = 404;
          return next(err);
        }

        return res.status(200).send({
          success: true,
          message: 'Meal retrieved successfully',
          meal,
        });
      })
      .catch((err) => {
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
  static addMeal(req, res, next) {
    const newMeal = req.body;
    newMeal.title = newMeal.title.toUpperCase();
    newMeal.UserId = req.user.id;

    db.Meal.create(newMeal)
      .then((meal) => {
        res.status(201).send({
          success: true,
          message: 'Meal added successfully',
          meal,
        });
      })
      .catch((err) => {
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
  static updateMeal(req, res, next) {
    const updatedMeal = req.body;
    updatedMeal.title = updatedMeal.title.toUpperCase();
    updatedMeal.UserId = req.user.id;

    db.Meal.update(updatedMeal, {
      where: {
        id: req.params.id,
      },
    })
      .then((update) => {
        if (update) {
          res.status(200).send({
            success: true,
            message: 'Update successful!',
            updatedMeal,
          });
        }
      })
      .catch((err) => {
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
  static deleteMeal(req, res, next) {
    db.Meal.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then(() =>
        res.status(204).send('Delete successful'))
      .catch((err) => {
        err = new Error('Error occurred while deleting meal!');
        err.status = 400;
        return next(err);
      });
  }
}


export default MealsController;
