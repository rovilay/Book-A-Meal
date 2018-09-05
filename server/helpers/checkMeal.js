/* eslint no-confusing-arrow: 0 */
import db from '../../models/index';
/**
 * Checks if meal is in db
 *
 * @param  {Array} Meals - List of meals to check db against
 * @param  {string} UserId - id of user making the request
 * @param  {object} next - next object to handle error
 * @return {boolean} true
 */

async function checkMeals(Meals, UserId = undefined, next) { // check if input meals is correct or in db
  const where = (UserId) ? { id: Meals, UserId: UserId } : { id: Meals }

  const foundMeals = await db.Meal.findAll({
    where,
    attributes: ['id']
  });

  const foundMealsId = foundMeals.map(meal => meal.id);

  //  check to get id of meals not found
  const notFoundMeals = Meals.filter(meal => (foundMealsId.indexOf(meal) > -1) ? false : meal);

  if (notFoundMeals.length > 0) {
    const err = new Error(`meals ${notFoundMeals}, not found!`);
    err.status = 404;
    return next(err);
  }

  return true;
}

export default checkMeals;
