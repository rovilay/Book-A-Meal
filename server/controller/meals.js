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

  addMeal(req, res) {
    if (!req.body.title) {
      return res.status(400).send({
        success: 'false',
        message: 'title is empty'
      });
    } else if (!req.body.description || !req.body.price) {
      return res.status(400).send({
        success: 'false',
        message: 'some fields are empty'
      });
    }
    // obj to input to the db
    const meal = {
      id: parseInt(meals[meals.length - 1].id) + 1,
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      image: req.body.image
    };

    // push meal to db
    meals.push(meal);

    return res.status(201).send({
      success: 'true',
      message: 'Meal added successfully',
      meals
    });
  }

}

const mealsController = new MealsController();
export default mealsController;