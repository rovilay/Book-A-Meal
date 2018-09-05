export const orders = [
  {
    id: 1,
    Meals: 'api/v1/orders/1',
    createdAt: '2018-08-23'
  },
  {
    id: 2,
    Meals: 'api/v1/orders/2',
    createdAt: '2018-08-24'
  },
  {
    id: 3,
    Meals: 'api/v1/orders/3',
    createdAt: '2018-08-25'
  }
]

export const orderMeals = [
  {
    id: '1',
    title: 'EBA AND EGUSI',
    cost: 300,
    portion: 1,
    price: 300
  },
  {
    id: '2',
    title: 'SALAD',
    cost: 200,
    portion: 1,
    price: 200
  },
    {
    id: '3',
    title: 'SPAGHETTI',
    cost: 100,
    portion: 2,
    price: 200
  },
  {
    id: '4',
    title: 'YAM AND EGG',
    cost: 400,
    portion: 1,
    price: 400
  }
]

export const pagination = {
  limit: 10,
  offset: 0,
  count: orders.length,
  numOfPages: 1
};

export const orderOnEdit = {
  orderId: 5,
  deliveryAddress: 'isuti rd',
  orderedMeals: orderMeals,
  totalPrice: 1100
}

export const orderDetails = {
  orderId: 6,
  deliveryAddress: 'isuti rd',
  Meals: [
    {
      id: 1,
      title: 'Eba and Egusi',
      OrderMeal: {
        portion: 1,
        cost: 400
      }
    },
    {
      id: 2,
      title: 'Ewa',
      OrderMeal: {
        portion: 2,
        cost: 800
      }
    }
  ],
}
