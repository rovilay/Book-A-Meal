import db from '../../models/index';


class MealsController {
  static getAllMeals(req, res) {
    db.Meal.findAll({
        attributes: ["id", "title", "description", "price", "image", "createdAt", "updatedAt"]
      })
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
    if (req.body.title === undefined || req.body.description === undefined || req.body.price === undefined) {
      return res.status(400).send({
        success: false,
        message: 'some fields are empty'
      });
    }

    const createdAt = new Date();
    const newMeal = req.body;

    db.Meal.create({
        title: newMeal.title,
        description: newMeal.description,
        price: newMeal.price,
        image: newMeal.image,
        createdAt
      })
      .then(meal => {
        res.status(201).send(meal);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  }

  static updateMeal(req, res) {

    if (req.body.title === undefined || req.body.description === undefined || req.body.price === undefined) {
      return res.status(400).send({
        success: false,
        message: 'All fields are required!'
      });
    }

    const updatedMeal = req.body;

    db.Meal.update({
        title: updatedMeal.title,
        description: updatedMeal.description,
        price: updatedMeal.price,
        image: updatedMeal.image,
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
          res.status(400).send(err)
        );
      }

    static deleteMeal(req, res) {
      db.Meal.destroy({
          where: {
            id: req.params.id
          }
        })
        .then((rep) =>
          res.status(200).send(`${rep}, delete succesfull`)
        )
        .catch(err =>
          res.status(404).send(err)
        );
    }
  }



  export default MealsController;