import express from 'express';
import mealController from '../controller/meals';

const mealRouter = express.Router();

mealRouter.get('/api/v1/meals', mealController.getAllMeals);
mealRouter.get('/api/v1/meals/:id', mealController.getMeal);


export default mealRouter;