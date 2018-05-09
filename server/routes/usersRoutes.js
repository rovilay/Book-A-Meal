import express from 'express';
import usersController from '../controller/users';
import validate from '../middlewares/validate/users';

const usersRouter = express.Router();

usersRouter.post('/api/v1/auth/signup', validate.signup, usersController.signup);
usersRouter.post('/api/v1/auth/login', validate.login, usersController.login);

export default usersRouter;
