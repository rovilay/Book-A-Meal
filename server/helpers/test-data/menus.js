import moment from 'moment';

import userData from './users';

const {
  adminUser3,
  adminUser4
} = userData;

export const meals1UUID = [
  '3e97f7da-f460-408a-a4b0-15f9ecc41cca',
  'fc198633-e442-46fc-bb89-7d67c0ad4693',
  'df8449dc-1e13-4084-a32a-6f476261831a',
  '7b7ba1e6-9790-4be5-9b7d-334b308da5bc',
  'ad2fb525-6771-4feb-9b54-a0ad6b8c2813',
  'bef1feb2-a5d0-4c13-928d-9dd011aa714b',
  'ee2f5319-07d9-43b9-a15e-0e5d9215da1c',
];

const meals2UUID = [
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

export const admin3Meals = [
  {
    title: 'PLANTAIN',
    description: 'So delicious',
    price: 500,
    image: 'https://img.com'
  },
  {
    title: 'SHARWAMA AND CHICKEN',
    description: 'So delicious',
    price: 900,
    image: 'https://img.com'
  },
  {
    title: 'YAM',
    description: 'So delicious',
    price: 650,
    image: 'https://img.com',
  },
  {
    title: 'RICE',
    description: 'So delicious',
    price: 400,
    image: 'https://img.com',
  },
  {
    title: 'POTATO AND SALAD',
    description: 'so delicious',
    price: 600,
    image: 'https://img.com',
  },
  {
    title: 'CAKE',
    description: 'so delicious',
    price: 900,
    image: 'https://img.com',
  },
  {
    title: 'SPAGHETTI AND SALAD',
    description: 'so delicious',
    price: 800,
    image: 'https://img.com',
  }
];

export const admin4Meals = [
  {
    title: 'PANCAKES AND EGG',
    description: 'so delicious',
    price: 1400,
    image: 'https://img.com',
  },
  {
    title: 'COCONUT RICE AND CHICKEN',
    description: 'so delicious',
    price: 800,
    image: 'https://img.com',
  },
  {
    title: 'APPLE',
    description: 'so delicious',
    price: 600,
    image: 'https://img.com',
  },
  {
    title: 'FRIED RICE AND CHICKEN',
    description: 'so delicious',
    price: 800,
    image: 'https://img.com',
  },
  {
    title: 'SALAD AND CREAM',
    description: 'so delicious',
    price: 500,
    image: 'https://img.com',
  },
  {
    title: 'YAM AND GARDEN EGG',
    description: 'so delicious',
    price: 650,
    image: 'https://img.com',
  },
  {
    title: 'PANCAKES AND SYRUP',
    description: 'so delicious',
    price: 800,
    image: 'https://img.com',
  }
];


// create meals with id and userId
export const meals1 = admin3Meals.map((meal, i) => {
  meal.id = meals1UUID[i];
  meal.UserId = adminUser3.id;
  return meal;
});

export const meals2 = admin4Meals.map((meal, i) => {
  meal.id = meals2UUID[i];
  meal.UserId = adminUser4.id;
  return meal;
});

export const admin3Menu = {
  postOn: '2020-05-18',
  meals: meals1UUID.slice(0, 2)
};

export const admin4Menu = {
  postOn: '2021-05-19',
  meals: meals2UUID.slice(0, 2)
};

/**
 * mock menu
 * data to populate menu table
 */
export const menusDatas = [
  {
    id: menuUUID[0],
    postOn: moment().format('YYYY-MM-DD'),
    UserId: adminUser3.id,
    createdAt: moment().format(),
    updatedAt: moment().format()
  },
  {
    id: menuUUID[1],
    postOn: '2018-06-20', // expired menu
    UserId: adminUser4.id,
    createdAt: moment().format(),
    updatedAt: moment().format()
  }
];

/**
 * mock menu meals
 * data to populate MenuMeals table
 */
export const admin3MenuMeals = [
  {
    id: 1,
    MenuId: menuUUID[0],
    MealId: meals1UUID[0],
    mealOwner: adminUser3.id,
    createdAt: moment().format(),
    updatedAt: moment().format()
  },
  {
    id: 2,
    MenuId: menuUUID[0],
    MealId: meals1UUID[1],
    mealOwner: adminUser3.id,
    createdAt: moment().format(),
    updatedAt: moment().format()
  },
  {
    id: 3,
    MenuId: menuUUID[0],
    MealId: meals1UUID[2],
    mealOwner: adminUser3.id,
    createdAt: moment().format(),
    updatedAt: moment().format()
  }
];

/**
 * mock menu meals
 * data to populate MenuMeals table
 */
export const admin4MenuMeals = [
  {
    id: 24,
    MenuId: menuUUID[1],
    MealId: meals2UUID[0],
    mealOwner: adminUser4.id,
    createdAt: moment().format(),
    updatedAt: moment().format()
  },
  {
    id: 25,
    MenuId: menuUUID[1],
    MealId: meals2UUID[1],
    mealOwner: adminUser4.id,
    createdAt: moment().format(),
    updatedAt: moment().format()
  },
  {
    id: 26,
    MenuId: menuUUID[1],
    MealId: meals2UUID[2],
    mealOwner: adminUser4.id,
    createdAt: moment().format(),
    updatedAt: moment().format()
  },
  {
    id: 27,
    MenuId: menuUUID[1],
    MealId: meals2UUID[3],
    mealOwner: adminUser4.id,
    createdAt: moment().format(),
    updatedAt: moment().format()
  }
];
