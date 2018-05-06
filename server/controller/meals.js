import db from '../../models/index';


class MealsController {
  static getAllMeals(req, res) {
    
    db.Meal.findAll({})
      .then(meal => res.status(200).send({
        success: true,
        message: 'Meals retrieved successfully',
        meal,
      }))
      .catch(err => res.status(400).send(err));
  }

  static getMeal(req, res) {
    db.Meal.findById(req.params.id, {
        attributes: ["id", "title", "description", "price", "image", "createdAt", "updatedAt"]
      })
      .then(meal => res.status(200).send({
        success: true,
        message: 'Meal retrieved successfully',
        meal
      }))
      .catch(err => res.status(400).send({
        success: false,
        err
      }));

  }

  static addMeal(req, res) {
    const newMeal = req.body;

    db.Meal.create({
        title: newMeal.title,
        description: newMeal.description,
        price: newMeal.price,
        image: newMeal.image,
        UserId: newMeal.UserId
      })
      .then(meal => {
        res.status(201).send(meal);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  }

  static updateMeal(req, res) {
    const updatedMeal = req.body;

    db.Meal.update({
        title: updatedMeal.title,
        description: updatedMeal.description,
        price: updatedMeal.price,
        image: updatedMeal.image,
        UserId: updatedMeal.UserId
      }, {
        where: {
          id: req.params.id
        }
      })
      .then(update => {
          if (update) {
            res.status(200).send({
              success: true,
              message: 'Update successful',
              updatedMeal,
            });
          }
        })
        .catch(err =>
          res.status(200).send(err)
        );
      }

    static deleteMeal(req, res) {
      db.Meal.destroy({
          where: {
            id: req.params.id
          }
        })
        .then(() =>
          res.status(200).send(`Delete successful`)
        )
        .catch(err =>
          res.status(404).send(err)
        );
    }
  }



  export default MealsController;