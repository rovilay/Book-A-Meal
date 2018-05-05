import jwt from 'jsonwebtoken';
import db from '../../models/index';
// import config from '../../config/config';


class UsersController {
  static signup(req, res) {
    const newUser = req.body;

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
    db.User.findOne({
        where: {
          email: loginUser.email,
          password: loginUser.password
        },
        attributes: ['id', 'admin']

      })
      .then((user) => {
        if (user === null) {
          return res.send({
            success: false,
            message: 'User not found!',
          });
        }
        // generate token
        jwt.sign({ user }, 'homealone', { expiresIn: '1h'}, (err, token) => {
          res.status(200).send({
            success: true,
            message: 'You are logged in!',
            user,
            token
          });
        });

        // return res.status(200).send({
        //   success: true,
        //   message: 'You are logged in!',
        //   user
        //   // token
        // });
      })
      .catch(err =>
        res.status(400).send(err)
      );
  }
}

export default UsersController;