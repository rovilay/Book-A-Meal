import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import db from '../../models';

dotenv.config();
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
    req.body.email = req.body.email.toLowerCase();

    db.User.create(req.body)
      .then(() => {
        res.status(201).send({
          success: true,
          message: 'user created successfully!',
        });
      })
      .catch((error) => {
        error = new Error('An error occurred, user already exist!');
        error.status = 409;
        return next(error);
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
      attributes: ['id', 'firstName', 'lastName', 'admin', 'password'],

    })
      .then((foundUser) => {
        const {
          id,
          firstName,
          lastName,
          admin,
          password
        } = foundUser;

        // Compare password
        bcrypt.compare(loginUser.password, password)
          .then((response) => {
            if (response) {
              return {
                id,
                admin,
                firstName,
                lastName
              };
            }
            const error = new Error('Email or Password is incorrect!');
            error.status = 401;
            throw error;
          })
          .then(() => {
            // generate token
            jwt.sign({ id, admin }, process.env.SECRET, { expiresIn: '24h' }, (error, token) => {
              res.status(200).send({
                success: true,
                message: 'You are logged in!',
                userId: id,
                firstName,
                lastName,
                token,
              });
            });
          })
          .catch(error => next(error));
      })
      .catch((error) => {
        error = new Error('Email does not exist!');
        error.status = 404;
        return next(error);
      });
  }
}

export default UsersController;
