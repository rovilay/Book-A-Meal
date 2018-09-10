import arraySort from 'array-sort';
/**
 * Adds meal to store
 * @param {*} state meal store state
 * @param {*} newMeal meal to add
 */
export const addMeal = (state, newMeal) => {
  const { meals, pagination } = state;
  const tempMeals = [...meals];

  if (tempMeals.length >= 12) {
    // remove last meal
    tempMeals.pop();
  }

  // add new meal
  tempMeals.unshift(newMeal);

  return {
    ...state,
    meals: arraySort(tempMeals, 'title'),
    pagination: {
      ...pagination,
      count: pagination.count + 1
    }
  };
};

/**
 * updates meal
 * @param {*} state meal store state
 * @param {*} mealUpdate meal to update
 */
export const updateMeal = (state, mealUpdate) => {
  const { meals, pagination } = state;
  let tempMeals = [...meals];

  tempMeals = tempMeals.map((meal) => {
    if (meal.id === mealUpdate.id) {
      return {
        ...meal,
        ...mealUpdate
      };
    }
    return meal;
  });

  return {
    ...state,
    meals: tempMeals,
    pagination
  };
};
