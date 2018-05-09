import db from '../../models/index';

class MenusController {
  static getAllMenus(req, res) {
    db.Menu.findAll({
      include: [{
        model: db.User,
        attributes: ['firstName', 'lastName']
      }, {
        model: db.Meal,
        attributes: ['id', 'title', 'price'],
        through: {
          attributes: ['id']
        }
      }]
    })
    .then(menu => res.status(200).send({
        success: true,
        message: 'Menus retrieved successfully',
        menus: menu
      })
    )
    .catch(() => res.status(400).send({
      success: false,
      message: 'Error occured while getting all menus'
    })
    );

  }

  static getMenu(req, res) {

    const day = req.params.DD;
    const month = req.params.MM;
    const year = req.params.YYYY;
    const date = `${year}-${month}-${day}`;
   
    db.Menu.findAll( {
      include: [{
        model: db.User,
        attributes: ['firstName', 'lastName']
      }, {
        model: db.Meal,
        attributes: ['id', 'title', 'price'],
        through: {
          attributes: ['id']
        }
      }],
      where: {
          postOn: date
        }
    })
    .then(menu => res.status(200).send({
        success: true,
        message: 'Menu retrieved successfully',
        menu
      })
    )
    .catch(() => res.status(400).send({
      success: false,
      message: 'Error occured while getting menu'
    })
    );
  }

  static postMenu(req, res) {
    const newMenu = req.body;
    
    db.Menu.create({
        UserId: req.user.id,
        postOn: newMenu.postOn
      })
      .then(menu => {
        menu.addMeals(newMenu.meals);
        res.status(200).send({
          success: true,
          message: 'Menu posted successfully!'
        });
      })
      .catch(() => {
        res.status.send({
          success: false,
          message: 'Error occured while posting menu'
        });
      });
  }
}

export default MenusController;