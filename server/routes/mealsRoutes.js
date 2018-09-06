import express from 'express';
import MealController from '../controller/MealsController';
import validateMeal from '../middlewares/validate/validateMeal';
import validateQuery from '../middlewares/validate/validateQuery';
import authorize from '../middlewares/authorize';
import adminOnly from '../middlewares/adminOnly';

const mealsRoutes = express.Router();

mealsRoutes.use('/api/v1/meals', authorize);
mealsRoutes.get('/api/v1/meals', adminOnly, validateQuery, MealController.getAllMeals);
mealsRoutes.get('/api/v1/meals/:mealId', adminOnly, MealController.getMeal);
mealsRoutes.delete('/api/v1/meals/:mealId', adminOnly, MealController.deleteMeal);
mealsRoutes.post('/api/v1/meals', adminOnly, validateMeal, MealController.addMeal);
mealsRoutes.put('/api/v1/meals/:mealId', adminOnly, validateMeal, MealController.updateMeal);

export default mealsRoutes;
