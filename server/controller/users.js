import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import db from '../../models/index';

require('dotenv').config();

class UsersController {
  static signup(req, res) {
    req.body.email = req.body.email.toLowerCase();

    db.User.create(req.body)
      .then(() => {
        res.status(201).send({
          success: true,
          message: 'user created successfully!',
        });
      })
      .catch(() => {
        res.status(400).send({
          success: true,
          message: 'An error occurred, user not created',
        });
      });
  }

  static login(req, res) {
    const loginUser = req.body;
    db.User.findOne({
      where: {
        email: loginUser.email.toLowerCase(),
      },
      attributes: ['id', 'admin', 'password'],

    })
      .then((found) => {
        // Compare password
        bcrypt.compare(loginUser.password, found.password)
          .then((response) => {
            if (response === false) {
              return res.status(400).send('Password do not Match');
            }
            return {
              id: found.id,
              admin: found.admin,
            };
          })
          .then((user) => {
            // generate token
            jwt.sign({ user }, process.env.SECRET, { expiresIn: '24h' }, (err, token) => {
              res.status(200).send({
                success: true,
                message: 'You are logged in!',
                token,
              });
            });
          });
      })
      .catch(() =>
        res.status(400).send({
          success: false,
          message: 'Error occured while trying to log in.',
        }));
  }
}

export default UsersController;
