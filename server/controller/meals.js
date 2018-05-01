
/* eslint class-methods-use-this: ["error", { "exceptMethods": ["getAllMeals", "getMeal", "addMeal", "updateMeal", "deleteMeal"] }] */
import meals from '../model/mealsdb';

class MealsController {
  static getAllMeals(req, res) {
    return res.status(200).send({
      success: true,
      message: 'Meals retrieved successfully',
      meals,
    });
  }

  static getMeal(req, res) {
    const id = parseInt(req.params.id, 10);
    meals.map((meal) => {
      if (meal.id === id) {
        return res.status(200).send({
          success: true,
          message: 'Meal retrieved successfully',
          meal
        });
      }

      return undefined;
    });

    return res.status(404).send({
      success: false,
      message: `meal with id ${id} does not exist!`
    });
  }

  static addMeal(req, res) {
    if (!req.body.title || !req.body.description || !req.body.price) {
      return res.status(400).send({
        success: false,
        message: 'some fields are empty'
      });
    }
    // obj to input to the db
    const meal = {
      id: parseInt(meals[meals.length - 1].id, 10) + 1,
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      image: req.body.image
    };

    // push meal to db
    meals.push(meal);

    return res.status(201).send({
      success: true,
      message: 'Meal added successfully',
      meals
    });
  }

  static updateMeal(req, res) {

    if (!req.body.title || !req.body.description || !req.body.price || !req.body.image ) {
      return res.status(404).send({
        success: false,
        message: 'All fields are required!'
      });
    } 

    const findMeal = function(meal) {
      return meal.id === id;
    };

    const id = parseInt(req.params.id, 10);
    const foundMeal = meals.find(findMeal);
    const foundMealIndex = meals.findIndex(findMeal);

    if (foundMealIndex === -1) {
      return res.status(404).send({
        success: false,
        message: 'meal not found'
      });
    }
    
    const updatedMeal = {
      id: foundMeal.id,
      title: req.body.title || foundMeal.title,
      description: req.body.description || foundMeal.description,
      price: req.body.price || foundMeal.price,
      image: req.body.image || foundMeal.image
    };

    meals.splice(foundMealIndex, 1, updatedMeal);

    return res.status(201).send({
      success: true,
      message: 'Meal updated successfully!',
      meals
    });
  }

  static deleteMeal(req, res) {
    const id = parseInt(req.params.id, 10);

    const findMeal = function(meal) {
      return meal.id === id;
    };
    const foundMealIndex = meals.findIndex(findMeal);

    if(foundMealIndex > -1) {
      meals.splice(foundMealIndex, 1);
      return res.status(200).send({
        success: true,
        message: 'Meal deleted successfully!'
      });
    } else {
      return res.status(404).send({
        success: false,
        message: `meal with id ${id} does not exist!`
      });
    }
  }
}


export default MealsController;