/* eslint no-confusing-arrow: 0 */
import db from '../../models';
/**
 * Checks if meal is in db
 *
 * @param  {Array} MealIds - List of meals to check db against
 * @param  {string} UserId - id of user making the request
 * @param  {object} next - next object to handle error
 * @return {boolean} true
 */

async function checkMeal(MealIds = [], UserId = undefined, next) { // check if input meals is correct or in db
  const where = (UserId) ? { id: MealIds, UserId } : { id: MealIds };

  const foundMeals = await db.Meal.findAll({
    where,
    attributes: ['id']
  });

  const foundMealsId = foundMeals.map(meal => meal.id);

  //  check to get id of meals not found
  const notFoundMeals = (MealIds.length > 0) && MealIds.filter(mealId => (foundMealsId.indexOf(mealId) > -1) ? false : mealId);

  if (notFoundMeals.length > 0) {
    const error = new Error(`meals ${notFoundMeals}, not found!`);
    error.status = 404;
    return next(error);
  }

  return true;
}

export default checkMeal;
