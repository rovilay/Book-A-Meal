import express from 'express';
import usersController from '../controller/users';

const usersRouter = express.Router();

usersRouter.post('/api/v1/auth/login', usersController.login);
usersRouter.post('/api/v1/auth/signup', usersController.signup);


export default usersRouter;