import moment from 'moment';

import userData from './users';

const {
  adminUser3,
  adminUser4,
  customerUser1,
  customerUser2
} = userData;

// repeating this because of sequelize unique constraint errors
export const meals1UUID = [
  '7a5d6838-569b-4fb5-955c-356ad7089645',
  'ed6b4db0-c8d0-4d86-8107-2ac0a5dd76ea',
  '2fc9b78e-91fc-4e3a-a606-1d03ade6768f',
  'd5cb437d-de4f-4763-a829-387b3d93d0cc',
  'dec84570-c70a-4106-861a-d743c40e1a64',
  '2833cb9f-edbf-4077-aa14-389054c14fb5',
  '4cc7f6c5-cb6b-499a-aac2-aa430bbb4b23'
];

const meals2UUID = [
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

export const admin3Meals = [
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

export const admin4Meals = [
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
export const meals1 = admin3Meals.map((meal, i) => {
  meal.id = meals1UUID[i];
  meal.UserId = adminUser3.id;
  return meal;
});

export const catererRoseMeals = meals1;

export const meals2 = admin4Meals.map((meal, i) => {
  meal.id = meals2UUID[i];
  meal.UserId = adminUser4.id;
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
    MenuId: menuUUID[0],
    MealId: meals1UUID[0],
    mealOwner: adminUser3.id,
    createdAt: moment().format(),
    updatedAt: moment().format()
  },
  {
    MenuId: menuUUID[0],
    MealId: meals1UUID[1],
    mealOwner: adminUser3.id,
    createdAt: moment().format(),
    updatedAt: moment().format()
  },
  {
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
    MenuId: menuUUID[1],
    MealId: meals2UUID[0],
    mealOwner: adminUser4.id,
    createdAt: moment().format(),
    updatedAt: moment().format()
  },
  {
    MenuId: menuUUID[1],
    MealId: meals2UUID[1],
    mealOwner: adminUser4.id,
    createdAt: moment().format(),
    updatedAt: moment().format()
  },
  {
    MenuId: menuUUID[1],
    MealId: meals2UUID[2],
    mealOwner: adminUser4.id,
    createdAt: moment().format(),
    updatedAt: moment().format()
  },
  {
    MenuId: menuUUID[1],
    MealId: meals2UUID[3],
    mealOwner: adminUser4.id,
    createdAt: moment().format(),
    updatedAt: moment().format()
  }
];

export const customer1Order = {
  deliveryAddress: 'Ikotun Lagos',
  meals: [
    {
      id: admin3MenuMeals[0].MealId,
      unitPrice: meals1[0].price,
      portion: 1
    },
    {
      id: admin3MenuMeals[1].MealId,
      unitPrice: meals2[0].price,
      portion: 2
    },
    {
      id: admin3MenuMeals[2].MealId,
      unitPrice: meals2[0].price,
      portion: 2
    },
  ]
};

export const customer1OrderUpdate = {
  deliveryAddress: 'Ikotun Lagos',
  meals: [
    {
      id: admin3MenuMeals[0].MealId,
      cost: meals1[0].price,
      portion: 1
    },
    {
      id: admin3MenuMeals[1].MealId,
      cost: meals2[0].price,
      portion: 2
    },
    {
      id: admin3MenuMeals[2].MealId,
      cost: meals2[0].price,
      portion: 2
    },
  ]
};

export const customer2Order = {
  deliveryAddress: 'maryland Lagos',
  meals: [
    {
      id: admin3MenuMeals[0].MealId,
      unitPrice: meals1[1].price,
      portion: 3
    },
    {
      id: admin3MenuMeals[1].MealId,
      unitPrice: meals2[1].price,
      portion: 2
    },
  ]
};

export const customer2OrderUpdate = {
  deliveryAddress: 'maryland Lagos',
  meals: [
    {
      id: admin3MenuMeals[0].MealId,
      cost: meals1[1].price,
      portion: 3
    },
    {
      id: admin3MenuMeals[1].MealId,
      cost: meals2[1].price,
      portion: 2
    },
  ]
};

export const ordersData = [
  {
    id: ordersUUID[0],
    UserId: customerUser1.id,
    deliveryAddress: '147 isuti rd',
    totalPrice: 4400,
    createdAt: moment().format(),
    updatedAt: moment().format()
  },
  {
    id: ordersUUID[1],
    UserId: customerUser2.id,
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
    MealId: admin3MenuMeals[0].MealId,
    portion: 2,
    cost: 500,
    createdAt: moment().format(),
    updatedAt: moment().format()
  },
  {
    id: 2,
    OrderId: ordersUUID[0],
    MealId: admin3MenuMeals[1].MealId,
    portion: 3,
    cost: 600,
    createdAt: moment().format(),
    updatedAt: moment().format()
  },
  {
    id: 3,
    OrderId: ordersUUID[0],
    MealId: admin3MenuMeals[2].MealId,
    portion: 4,
    cost: 400,
    createdAt: moment().format(),
    updatedAt: moment().format()
  },
  {
    id: 4,
    OrderId: ordersUUID[1],
    MealId: admin3MenuMeals[0].MealId,
    portion: 1,
    cost: 600,
    createdAt: moment().format(),
    updatedAt: moment().format()
  },
  {
    id: 5,
    OrderId: ordersUUID[1],
    MealId: admin3MenuMeals[1].MealId,
    portion: 1,
    cost: 800,
    createdAt: moment().format(),
    updatedAt: moment().format()
  },
  {
    id: 6,
    OrderId: ordersUUID[1],
    MealId: admin3MenuMeals[2].MealId,
    portion: 2,
    cost: 800,
    createdAt: moment().format(),
    updatedAt: moment().format()
  }
];
