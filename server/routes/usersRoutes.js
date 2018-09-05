import express from 'express';
import UsersController from '../controller/UsersController';
import ValidateUser from '../middlewares/validate/ValidateUser';

const usersRoutes = express.Router();

usersRoutes.post('/api/v1/auth/signup', ValidateUser.signup, UsersController.signup);
usersRoutes.post('/api/v1/auth/login', ValidateUser.login, UsersController.login);

export default usersRoutes;
