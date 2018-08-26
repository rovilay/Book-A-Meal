export const meals = [
  {
  id: '6edf5100-3313-4a4f-8a9d-a1bf79b0a72f',
  title: 'EBA AND EGUSI',
  price: 1000,
  portion: 2
},
{
  id: 'ce41fb68-4a51-4033-8c3a-e5a27eadcc91',
  title: 'SALAD',
  price: 400,
  portion: 3
},
  {
  id: '58634b35-2254-40de-a5eb-3c1166ac56c0',
  title: 'SPAGHETTI',
  price: 600,
  portion: 1
},
{
  id: '959f0675-0ad3-47b7-8401-ec9e10bc1863',
  title: 'YAM AND EGG',
  price: 500,
  portion: 2
},
];

export const mealUpdate = {
  price: 800,
  description: 'so delicious'
}

export const newMeal = {
  id: '53baa56a-e81f-43e8-b3fa-2e910fc3e8b9',
  title: 'YELLOW RICE AND STEW',
  price: 500,
  description: 'sweet'
}

export const updatedMeals = [
  ...meals.slice(0, 3),
  {
    ...meals[3],
    ...mealUpdate
  }
]

export const pagination = {
  limit: 12,
  offset: 0,
  count: meals.length,
  numOfPages: 1
};

export const mealDeleteResponse = {
  meals: [...meals.slice(0, 3)],
  pagination: {
    ...pagination,
    count: meals.length - 1
  }

}

export const cartWithMeals = {
  meals: [
    {
      ...meals[0],
      unitPrice: meals[0].price,
      price: meals[0].price * meals[0].portion
    }
  ],
  totalPrice: 2000
}
