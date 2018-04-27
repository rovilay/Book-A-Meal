import meals from '../model/mealsdb';

class MealsController {
  getAllMeals(req, res) {
    return res.status(200).send({
      success: 'true',
      message: 'Meals retrieved successfully',
      meals: meals
    });
  }

  getMeal(req, res) {
    const id = parseInt(req.params.id, 10);
    meals.map((meal) => {
      if (meal.id === id) {
        return res.status(200).send({
          success: 'true',
          message: 'Meal retrieved successfully',
          meal: meal
        });
      }
    });

    return res.status(404).send({
      success: 'false',
      message: `meal with id ${id} does not exist!`
    });
  }
}

const mealsController = new MealsController();
export default mealsController;