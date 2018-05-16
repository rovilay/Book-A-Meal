import db from '../../models/index';


class MealsController {
  static getAllMeals(req, res) {
    db.Meal.findAll()
      .then(meals => res.status(200).send({
        success: true,
        message: 'Meals retrieved successfully',
        meals,
      }))
      .catch(() => res.status(400).send({
        success: false,
        message: 'Error occured while getting all meals',
      }));
  }

  static getMeal(req, res) {
    db.Meal.findById(req.params.id)
      .then((meal) => {
        if (meal === null) {
          return res.status(404).send({
            success: false,
            message: 'Meal not found!',
          });
        }

        return res.status(200).send({
          success: true,
          message: 'Meal retrieved successfully',
          meal,
        });
      })
      .catch(() => res.status(400).send({
        success: false,
        message: 'Error occured while getting meal',
      }));
  }

  static addMeal(req, res) {
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
      .catch(() => {
        res.status(400).send({
          success: false,
          message: 'Error occured  while creating meal',
        });
      });
  }

  static updateMeal(req, res) {
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
      .catch(() =>
        res.status(400).send({
          success: false,
          message: 'Error occured while updating meal',
        }));
  }

  static deleteMeal(req, res) {
    db.Meal.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then(() =>
        res.status(204).send('Delete successful'))
      .catch(() =>
        res.status(400).send('error occured while deleting'));
  }
}


export default MealsController;
