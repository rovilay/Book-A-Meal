import moment from 'moment';

import users from './users';

const {
  catererMaria,
  catererDeji,
  customerRose,
  customerRovi
} = users;

// repeating this because of sequelize unique constraint errors
export const catererMariaMealsUUID = [
  '7a5d6838-569b-4fb5-955c-356ad7089645',
  'ed6b4db0-c8d0-4d86-8107-2ac0a5dd76ea',
  '2fc9b78e-91fc-4e3a-a606-1d03ade6768f',
  'd5cb437d-de4f-4763-a829-387b3d93d0cc',
  'dec84570-c70a-4106-861a-d743c40e1a64',
  '2833cb9f-edbf-4077-aa14-389054c14fb5',
  '4cc7f6c5-cb6b-499a-aac2-aa430bbb4b23'
];

const catererDejiMealsUUID = [
  '16c4c33f-db5e-457b-8559-849b1b5a1830',
  'b0092d7d-10fe-4ec1-8e31-49f5518ce037',
  '7a41ce1d-ac67-4fc7-9e3f-7470840ac355',
  '50b07194-691c-4ff5-bf1f-e3fde7d188fe',
  '5f5d0338-48b1-44a3-a447-9a1eb1e95aec',
  '5a15ca24-a6fb-46a5-b3e7-792a517575c7',
  '3a982bff-ab89-48fc-93da-fab580773d1b'
];

const menuUUID = [
  '5a12dead-82ef-4d0d-bd3c-77650882d018',
  '6f74f44c-36c5-4b43-b5dc-8db3e77d7f63'
];

const ordersUUID = [
  'ede3ab95-e84e-4814-8011-adbc515eee5d',
  '50aba9e1-a012-4ae4-b7a6-8dd5dda0ac29'
];

export const catererMariaMeals = [
  {
    title: ' BOILED PLANTAIN',
    description: 'So delicious',
    price: 500,
    image: 'https://res.cloudinary.com/dcqnswemi/image/upload/v1529300780/default_meal_img.jpg'
  },
  {
    title: 'CHICKEN',
    description: 'So delicious',
    price: 900,
    image: 'https://res.cloudinary.com/dcqnswemi/image/upload/v1529300780/default_meal_img.jpg'
  },
  {
    title: 'FRIED YAM',
    description: 'So delicious',
    price: 650,
    image: 'https://res.cloudinary.com/dcqnswemi/image/upload/v1529300780/default_meal_img.jpg',
  },
  {
    title: 'YELLOW RICE',
    description: 'So delicious',
    price: 400,
    image: 'https://res.cloudinary.com/dcqnswemi/image/upload/v1529300780/default_meal_img.jpg',
  },
  {
    title: 'POTATO CHIPS',
    description: 'so delicious',
    price: 600,
    image: 'https://res.cloudinary.com/dcqnswemi/image/upload/v1529300780/default_meal_img.jpg',
  },
  {
    title: 'CREAM CAKE',
    description: 'so delicious',
    price: 900,
    image: 'https://res.cloudinary.com/dcqnswemi/image/upload/v1529300780/default_meal_img.jpg',
  },
  {
    title: 'SPAGHETTI, CHEESE AND SALAD',
    description: 'so delicious',
    price: 800,
    image: 'https://res.cloudinary.com/dcqnswemi/image/upload/v1529300780/default_meal_img.jpg',
  }
];

export const catererDejiMeals = [
  {
    title: 'BOILED EGG',
    description: 'so delicious',
    price: 1400,
    image: 'https://res.cloudinary.com/dcqnswemi/image/upload/v1529300780/default_meal_img.jpg',
  },
  {
    title: 'COCONUT RICE, STEW AND CHICKEN',
    description: 'so delicious',
    price: 800,
    image: 'https://res.cloudinary.com/dcqnswemi/image/upload/v1529300780/default_meal_img.jpg',
  },
  {
    title: 'APPLE AND BERRY',
    description: 'so delicious',
    price: 600,
    image: 'https://res.cloudinary.com/dcqnswemi/image/upload/v1529300780/default_meal_img.jpg',
  },
  {
    title: 'FRIED RICE, SALAD AND CHICKEN',
    description: 'so delicious',
    price: 800,
    image: 'https://res.cloudinary.com/dcqnswemi/image/upload/v1529300780/default_meal_img.jpg',
  },
  {
    title: 'SALAD AND WHIPPED CREAM',
    description: 'so delicious',
    price: 500,
    image: 'https://res.cloudinary.com/dcqnswemi/image/upload/v1529300780/default_meal_img.jpg',
  },
  {
    title: 'YAM AND FRIED EGG',
    description: 'so delicious',
    price: 650,
    image: 'https://res.cloudinary.com/dcqnswemi/image/upload/v1529300780/default_meal_img.jpg',
  },
  {
    title: 'PANCAKES, SUSAGE AND SYRUP',
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

export const catererRoseMeals = caterermariaMeals;

export const catererdejiMeals = catererDejiMeals.map((meal, i) => {
  meal.id = catererDejiMealsUUID[i];
  meal.UserId = catererDeji.id;
  return meal;
});

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
    MenuId: menuUUID[0],
    MealId: catererMariaMealsUUID[0],
    mealOwner: catererMaria.id,
    createdAt: moment().format(),
    updatedAt: moment().format()
  },
  {
    MenuId: menuUUID[0],
    MealId: catererMariaMealsUUID[1],
    mealOwner: catererMaria.id,
    createdAt: moment().format(),
    updatedAt: moment().format()
  },
  {
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
    MenuId: menuUUID[1],
    MealId: catererDejiMealsUUID[0],
    mealOwner: catererDeji.id,
    createdAt: moment().format(),
    updatedAt: moment().format()
  },
  {
    MenuId: menuUUID[1],
    MealId: catererDejiMealsUUID[1],
    mealOwner: catererDeji.id,
    createdAt: moment().format(),
    updatedAt: moment().format()
  },
  {
    MenuId: menuUUID[1],
    MealId: catererDejiMealsUUID[2],
    mealOwner: catererDeji.id,
    createdAt: moment().format(),
    updatedAt: moment().format()
  },
  {
    MenuId: menuUUID[1],
    MealId: catererDejiMealsUUID[3],
    mealOwner: catererDeji.id,
    createdAt: moment().format(),
    updatedAt: moment().format()
  }
];

export const customerRoseOrder = {
  deliveryAddress: 'Ikotun Lagos',
  meals: [
    {
      id: catererMariaMenuMeals[0].MealId,
      unitPrice: caterermariaMeals[0].price,
      portion: 1
    },
    {
      id: catererMariaMenuMeals[1].MealId,
      unitPrice: catererdejiMeals[0].price,
      portion: 2
    },
    {
      id: catererMariaMenuMeals[2].MealId,
      unitPrice: catererdejiMeals[0].price,
      portion: 2
    },
  ]
};

export const customerRoseOrderUpdate = {
  deliveryAddress: 'Ikotun Lagos',
  meals: [
    {
      id: catererMariaMenuMeals[0].MealId,
      cost: caterermariaMeals[0].price,
      portion: 1
    },
    {
      id: catererMariaMenuMeals[1].MealId,
      cost: catererdejiMeals[0].price,
      portion: 2
    },
    {
      id: catererMariaMenuMeals[2].MealId,
      cost: catererdejiMeals[0].price,
      portion: 2
    },
  ]
};

export const customerRoviOrder = {
  deliveryAddress: 'maryland Lagos',
  meals: [
    {
      id: catererMariaMenuMeals[0].MealId,
      unitPrice: caterermariaMeals[1].price,
      portion: 3
    },
    {
      id: catererMariaMenuMeals[1].MealId,
      unitPrice: catererdejiMeals[1].price,
      portion: 2
    },
  ]
};

export const customerRoviOrderUpdate = {
  deliveryAddress: 'maryland Lagos',
  meals: [
    {
      id: catererMariaMenuMeals[0].MealId,
      cost: caterermariaMeals[1].price,
      portion: 3
    },
    {
      id: catererMariaMenuMeals[1].MealId,
      cost: catererdejiMeals[1].price,
      portion: 2
    },
  ]
};

export const ordersData = [
  {
    id: ordersUUID[0],
    UserId: customerRose.id,
    deliveryAddress: '147 isuti rd',
    totalPrice: 4400,
    createdAt: moment().format(),
    updatedAt: moment().format()
  },
  {
    id: ordersUUID[1],
    UserId: customerRovi.id,
    deliveryAddress: '50 isuti rd',
    totalPrice: 3000,
    createdAt: moment().format(),
    updatedAt: moment().format()
  }
];

export const orderMeals = [
  {
    id: 1,
    OrderId: ordersUUID[0],
    MealId: catererMariaMenuMeals[0].MealId,
    portion: 2,
    cost: 500,
    createdAt: moment().format(),
    updatedAt: moment().format()
  },
  {
    id: 2,
    OrderId: ordersUUID[0],
    MealId: catererMariaMenuMeals[1].MealId,
    portion: 3,
    cost: 600,
    createdAt: moment().format(),
    updatedAt: moment().format()
  },
  {
    id: 3,
    OrderId: ordersUUID[0],
    MealId: catererMariaMenuMeals[2].MealId,
    portion: 4,
    cost: 400,
    createdAt: moment().format(),
    updatedAt: moment().format()
  },
  {
    id: 4,
    OrderId: ordersUUID[1],
    MealId: catererMariaMenuMeals[0].MealId,
    portion: 1,
    cost: 600,
    createdAt: moment().format(),
    updatedAt: moment().format()
  },
  {
    id: 5,
    OrderId: ordersUUID[1],
    MealId: catererMariaMenuMeals[1].MealId,
    portion: 1,
    cost: 800,
    createdAt: moment().format(),
    updatedAt: moment().format()
  },
  {
    id: 6,
    OrderId: ordersUUID[1],
    MealId: catererMariaMenuMeals[2].MealId,
    portion: 2,
    cost: 800,
    createdAt: moment().format(),
    updatedAt: moment().format()
  }
];
