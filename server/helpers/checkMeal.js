import db from '../../models/index';
/**
 * Checks if meal is in db
 *
 * @param  {Array} Meals - List of meals to check db against
 * @param  {object} next - next object to handle error
 * @return {boolean} true
 */

async function checkMeals(Meals, next) { // check if input meals is correct or in db
  try {
    const result = await db.Meal.findAll({
      where: { id: Meals },
      attributes: ['id']
    });

    const ids = [];
    result.forEach((resp) => {
      ids.push(resp.id);
    });
    Meals.forEach((meal) => {
      if (ids.includes(meal) === false) {
        const err = new Error(`meal with id: ${meal}, not found!`);
        err.status = 404;
        throw err;
      }
    });

    return true;
  } catch (err) {
    return next(err);
  }
}

export default checkMeals;
