import notify from '../notify';

/**
 * Adds meal to cart
 * @param {*} state cart store state
 * @param {*} newMeal
 */
export const addMeal = (state, newMeal) => {
  const {
    meals: mealsInCart,
    totalPrice
  } = state;

  let newTotalPrice = totalPrice;

  const {
    id,
    title,
    price: unitPrice,
    portion = 1
  } = newMeal;

    // check if meal is already in cart
  const checkedCartMeals = mealsInCart.filter(meal => meal.id !== id);

  if (mealsInCart.length === 0 ||
      checkedCartMeals.length === mealsInCart.length) {
    newTotalPrice += unitPrice * portion;
    notify('Meal added to cart', 'toast-success', 'bottom-left');
    return {
      ...state,
      meals: [
        ...checkedCartMeals,
        {
          id,
          title,
          unitPrice,
          portion,
          price: unitPrice * portion
        }
      ],
      totalPrice: newTotalPrice
    };
  }

  if (mealsInCart.length > checkedCartMeals.length) {
    notify('Meal already in cart!', 'toast-danger', 'bottom-left');
    return {
      ...state
    };
  }
};

/**
 * Removes meal from cart
 * @param {*} state cart store state
 * @param {*} mealToDelete meal to delete from cart
 */
export const deleteMeal = (state, mealToDelete) => {
  const {
    meals: mealsInCart,
    totalPrice
  } = state;

  let newTotalPrice = totalPrice;

  // check if meal already in cart
  const checkedCartMeals = mealsInCart
    .filter(meal => meal.id !== mealToDelete.id);

  if (checkedCartMeals.length !== mealsInCart.length) {
    newTotalPrice -= mealToDelete.price;

    return {
      ...state,
      meals: checkedCartMeals,
      totalPrice: newTotalPrice
    };
  }
};

/**
 * Updates portion of a meal in cart
 * @param {*} state cart store state
 * @param {*} mealToUpdate meal whose portion is to be updated
 */
export const updateMealPortion = (state, mealToUpdate) => {
  const {
    meals
  } = state;
  const updatedMeals = [...meals];
  let totalPrice = 0;
  updatedMeals.map((meal) => {
    if (meal.id === mealToUpdate.id) {
      meal.portion = mealToUpdate.portion;
      meal.price = meal.unitPrice * mealToUpdate.portion;
    }
    totalPrice += meal.price;
  });

  return {
    ...state,
    meals: updatedMeals,
    totalPrice
  };
};
