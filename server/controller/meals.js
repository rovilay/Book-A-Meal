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
      meals: meals
    });
  }

  updateMeal(req, res) {
    const id = parseInt(req.params.id, 10);
    let foundMeal;
    let itemIndex;

    meals.map((meal, index) => {
      if (meal.id === id) {
        foundMeal = meal;
        itemIndex = index;
      }
    });
    if (!foundMeal) {
      return res.status(404).send({
        success: 'false',
        message: 'meal not found'
      });
    }
    if (!req.body.title) {
      return res.status(404).send({
        success: 'false',
        message: 'title is required!'
      });
    } else if (!req.body.description) {
      return res.status(404).send({
        success: 'false',
        message: 'description is required!'
      });
    } else if (!req.body.price) {
      return res.status(404).send({
        success: 'false',
        message: 'price is required!'
      });
    } else if (!req.body.image) {
      return res.status(404).send({
        success: 'false',
        message: 'image is required!'
      });
    }

    const updatedMeal = {
      id: foundMeal.id,
      title: req.body.title || foundMeal.title,
      description: req.body.description || foundMeal.description,
      price: req.body.price || foundMeal.price,
      image: req.body.image || foundMeal.image
    };

    meals.splice(itemIndex, 1, updatedMeal);

    return res.status(201).send({
      success: 'true',
      message: 'Meal updated successfully!',
      meals
    });
  }

  deleteMeal(req, res) {
    const id = parseInt(req.params.id, 10);
    meals.map((meal, index) => {
      if (meal.id === id) {
        meals.splice(index, 1);
        return res.status(200).send({
          success: 'true',
          message: 'Meal deleted successfully!'
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