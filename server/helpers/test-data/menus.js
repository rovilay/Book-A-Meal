import moment from 'moment';

import users from './users';

const {
  catererMaria,
  catererDeji
} = users;

export const catererMariaMealsUUID = [
  '3e97f7da-f460-408a-a4b0-15f9ecc41cca',
  'fc198633-e442-46fc-bb89-7d67c0ad4693',
  'df8449dc-1e13-4084-a32a-6f476261831a',
  '7b7ba1e6-9790-4be5-9b7d-334b308da5bc',
  'ad2fb525-6771-4feb-9b54-a0ad6b8c2813',
  'bef1feb2-a5d0-4c13-928d-9dd011aa714b',
  'ee2f5319-07d9-43b9-a15e-0e5d9215da1c',
];

const catererDejiMealsUUID = [
  '25cf8240-2eec-40dd-9678-1b6f722561d3',
  '8a18d89c-309b-4b16-b65a-40d0576574ed',
  '4443d982-56fb-4c85-8866-50517276a196',
  'eabc16aa-648b-45b8-b704-d486a6d6823a',
  'd57896c1-4637-4f91-abb8-8cb500550e03',
  '13ddfcc9-329a-4966-93ad-2967c7847d23',
  'ef6f65ed-3bc1-4322-a43a-f8ec5e2193dc',
];

export const menuUUID = [
  'b39f320e-f777-4554-a64c-579844cc2b2c',
  '9349c922-c296-4b40-9437-4278cf91fd29',
];

export const catererMariaMeals = [
  {
    title: 'PLANTAIN',
    description: 'So delicious',
    price: 500,
    image: 'https://res.cloudinary.com/dcqnswemi/image/upload/v1529300780/default_meal_img.jpg'
  },
  {
    title: 'SHARWAMA AND CHICKEN',
    description: 'So delicious',
    price: 900,
    image: 'https://res.cloudinary.com/dcqnswemi/image/upload/v1529300780/default_meal_img.jpg'
  },
  {
    title: 'YAM',
    description: 'So delicious',
    price: 650,
    image: 'https://res.cloudinary.com/dcqnswemi/image/upload/v1529300780/default_meal_img.jpg',
  },
  {
    title: 'RICE',
    description: 'So delicious',
    price: 400,
    image: 'https://res.cloudinary.com/dcqnswemi/image/upload/v1529300780/default_meal_img.jpg',
  },
  {
    title: 'POTATO AND SALAD',
    description: 'so delicious',
    price: 600,
    image: 'https://res.cloudinary.com/dcqnswemi/image/upload/v1529300780/default_meal_img.jpg',
  },
  {
    title: 'CAKE',
    description: 'so delicious',
    price: 900,
    image: 'https://res.cloudinary.com/dcqnswemi/image/upload/v1529300780/default_meal_img.jpg',
  },
  {
    title: 'SPAGHETTI AND SALAD',
    description: 'so delicious',
    price: 800,
    image: 'https://res.cloudinary.com/dcqnswemi/image/upload/v1529300780/default_meal_img.jpg',
  }
];

export const catererDejiMeals = [
  {
    title: 'PANCAKES AND EGG',
    description: 'so delicious',
    price: 1400,
    image: 'https://res.cloudinary.com/dcqnswemi/image/upload/v1529300780/default_meal_img.jpg',
  },
  {
    title: 'COCONUT RICE AND CHICKEN',
    description: 'so delicious',
    price: 800,
    image: 'https://res.cloudinary.com/dcqnswemi/image/upload/v1529300780/default_meal_img.jpg',
  },
  {
    title: 'APPLE',
    description: 'so delicious',
    price: 600,
    image: 'https://res.cloudinary.com/dcqnswemi/image/upload/v1529300780/default_meal_img.jpg',
  },
  {
    title: 'FRIED RICE AND CHICKEN',
    description: 'so delicious',
    price: 800,
    image: 'https://res.cloudinary.com/dcqnswemi/image/upload/v1529300780/default_meal_img.jpg',
  },
  {
    title: 'SALAD AND CREAM',
    description: 'so delicious',
    price: 500,
    image: 'https://res.cloudinary.com/dcqnswemi/image/upload/v1529300780/default_meal_img.jpg',
  },
  {
    title: 'YAM AND GARDEN EGG',
    description: 'so delicious',
    price: 650,
    image: 'https://res.cloudinary.com/dcqnswemi/image/upload/v1529300780/default_meal_img.jpg',
  },
  {
    title: 'PANCAKES AND SYRUP',
    description: 'so delicious',
    price: 800,
    image: 'https://res.cloudinary.com/dcqnswemi/image/upload/v1529300780/default_meal_img.jpg',
  }
];


// create meals with id and userId
export const caterermariaMeals = catererMariaMeals.map((meal, i) => {
  meal.id = catererMariaMealsUUID[i];
  meal.UserId = catererMaria.id;
  return meal;
});

export const catererdejiMeals = catererDejiMeals.map((meal, i) => {
  meal.id = catererDejiMealsUUID[i];
  meal.UserId = catererDeji.id;
  return meal;
});

export const catererMariaMenu = {
  postOn: '2020-05-18',
  meals: catererMariaMealsUUID.slice(0, 2)
};

export const catererDejiMenu = {
  postOn: '2021-05-19',
  meals: catererDejiMealsUUID.slice(0, 2)
};

/**
 * mock menu
 * data to populate menu table
 */
export const menusDatas = [
  {
    id: menuUUID[0],
    postOn: moment().format('YYYY-MM-DD'),
    UserId: catererMaria.id,
    createdAt: moment().format(),
    updatedAt: moment().format()
  },
  {
    id: menuUUID[1],
    postOn: '2018-06-20', // expired menu
    UserId: catererDeji.id,
    createdAt: moment().format(),
    updatedAt: moment().format()
  }
];

/**
 * mock menu meals
 * data to populate MenuMeals table
 */
export const catererMariaMenuMeals = [
  {
    id: 1,
    MenuId: menuUUID[0],
    MealId: catererMariaMealsUUID[0],
    mealOwner: catererMaria.id,
    createdAt: moment().format(),
    updatedAt: moment().format()
  },
  {
    id: 2,
    MenuId: menuUUID[0],
    MealId: catererMariaMealsUUID[1],
    mealOwner: catererMaria.id,
    createdAt: moment().format(),
    updatedAt: moment().format()
  },
  {
    id: 3,
    MenuId: menuUUID[0],
    MealId: catererMariaMealsUUID[2],
    mealOwner: catererMaria.id,
    createdAt: moment().format(),
    updatedAt: moment().format()
  }
];

/**
 * mock menu meals
 * data to populate MenuMeals table
 */
export const catererDejiMenuMeals = [
  {
    id: 24,
    MenuId: menuUUID[1],
    MealId: catererDejiMealsUUID[0],
    mealOwner: catererDeji.id,
    createdAt: moment().format(),
    updatedAt: moment().format()
  },
  {
    id: 25,
    MenuId: menuUUID[1],
    MealId: catererDejiMealsUUID[1],
    mealOwner: catererDeji.id,
    createdAt: moment().format(),
    updatedAt: moment().format()
  },
  {
    id: 26,
    MenuId: menuUUID[1],
    MealId: catererDejiMealsUUID[2],
    mealOwner: catererDeji.id,
    createdAt: moment().format(),
    updatedAt: moment().format()
  },
  {
    id: 27,
    MenuId: menuUUID[1],
    MealId: catererDejiMealsUUID[3],
    mealOwner: catererDeji.id,
    createdAt: moment().format(),
    updatedAt: moment().format()
  }
];
