import express from 'express';
import mealController from '../controller/meals';

const mealRouter = express.Router();

// Get all meals
mealRouter.get('/api/v1/meals', mealController.getAllMeals);


export default mealRouter;