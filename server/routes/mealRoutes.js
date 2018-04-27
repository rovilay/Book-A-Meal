import express from 'express';
import mealController from '../controller/meals';

const mealRouter = express.Router();

mealRouter.get('/api/v1/meals', mealController.getAllMeals);
mealRouter.get('/api/v1/meals/:id', mealController.getMeal);
mealRouter.post('/api/v1/meals', mealController.addMeal);
mealRouter.put('/api/v1/meals/:id', mealController.updateMeal);
mealRouter.delete('/api/v1/meals/:id', mealController.deleteMeal);


export default mealRouter;