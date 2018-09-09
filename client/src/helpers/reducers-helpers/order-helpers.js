/**
 * Updates ordered meal portion
 * @param {*} state order store state
 * @param {*} mealToUpdate meal whose portion is to be updated
 */
export const updateMealPortion = (state, mealToUpdate) => {
  const { mealId, portion } = mealToUpdate;

  const { orderedMeals } = state.editOrder;
  let totalPrice = 0;

  const updatedOrderMeals = [...orderedMeals].map((meal) => {
    if (meal.id === mealId) {
      meal.portion = portion;
      meal.price = portion * meal.cost;
    }

    totalPrice += meal.price;
    return meal;
  });

  return {
    ...state,
    editOrder: {
      ...state.editOrder,
      totalPrice,
      orderedMeals: updatedOrderMeals
    }
  };
};

/**
 * removes meal from order in edit state
 * @param {*} state order store state
 * @param {*} mealId id of meal to remove
 */
export const deleteMeal = (state, mealId) => {
  const { orderedMeals, totalPrice } = state.editOrder;

  let newTotalPrice = totalPrice;
  const newOrderedMeals = [...orderedMeals];

  newOrderedMeals.map((meal, i) => {
    if (meal.id === mealId) {
      newOrderedMeals.splice(i, 1);
      newTotalPrice -= meal.price;
    }
  });

  return {
    ...state,
    editOrder: {
      ...state.editOrder,
      orderedMeals: newOrderedMeals,
      totalPrice: newTotalPrice
    }
  };
};
