import meals from '../model/mealsdb';

class MealsController {
  getAllMeals(req, res) {
    return res.status(200).send({
      success: 'true',
      message: 'Meals retrieved successfully',
      meals: meals
    });
  }
}

const mealsController = new MealsController();
export default mealsController;