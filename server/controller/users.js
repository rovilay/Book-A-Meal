import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import db from '../../models/index';

require('dotenv').config();
/**
 * Handles user signup and log in operations
 * @exports
 * @class UsersController
 */
class UsersController {
  /**
   * Adds user
   *
   * @static
   * @param  {object} req - Request object
   * @param  {object} res - Response object
   * @param {function} next - next object (for error handling)
   * @return {json} res.send
   * @memberof UsersController
   */
  static signup(req, res, next) {
    // req.body.email = req.body.email.toLowerCase();

    db.User.create(req.body)
      .then(() => {
        res.status(201).send({
          success: true,
          message: 'user created successfully!',
        });
      })
      .catch((err) => {
        err = new Error('An error occurred, user not created!');
        err.status = 400;
        return next(err);
      });
  }

  /**
   * Logs in users
   *
   * @static
   * @param  {object} req - Request object
   * @param  {object} res - Response object
   * @param {function} next - next object (for error handling)
   * @return {json} res.send
   * @memberof UsersController
   */
  static login(req, res, next) {
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
            if (response) {
              return {
                id: found.id,
                admin: found.admin,
              };
            }

            const err = new Error('Password do not match!');
            err.status = 400;
            throw err;
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
          })
          .catch(err => next(err));
      })
      .catch((err) => {
        err = new Error('User not found!');
        err.status = 404;
        return next(err);
      });
  }
}

export default UsersController;
