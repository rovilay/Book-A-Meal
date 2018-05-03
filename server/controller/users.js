import db from '../../models/index';


class UsersController {
  static signup(req, res) {
    const newUser = req.body;
    if (newUser.firstName === undefined || newUser.lastName === undefined || newUser.email === undefined || newUser.password === undefined || newUser.address === undefined || newUser.Phone === undefined || newUser.city === undefined || newUser.state === undefined) {
      return res.status(400).send({
        success: false,
        message: 'some fields are empty'
      });
    }

    const createdAt = new Date();

    db.User.create({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        password: newUser.password,
        address: newUser.address,
        address2: newUser.address2,
        Phone: newUser.Phone,
        Phone2: newUser.Phone2,
        city: newUser.city,
        state: newUser.state,
        admin: newUser.admin,
        createdAt
      })
      .then(() => {
        res.status(201).send({
          success: true,
          message: "user created successfully!"
        });
      })
      .catch(err => {
        res.status(400).send(err);
      });

  }

  static login(req, res) {
    const loginUser = req.body;

    if (loginUser.email === undefined) {
      return res.status(400).send({
        success: false,
        message: 'some fields are empty'
      });
    }

    db.User.findOne({
        where: {
          email: loginUser.email,
          password: loginUser.password
        }
      })
      .then(() => res.status(200).send({
        success: true,
        message: 'You are logged in!'
      }))
      .catch(err =>
        res.status(400).send(err)
      );
  }
}

export default UsersController;