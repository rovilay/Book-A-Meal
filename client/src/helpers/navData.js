const adminNavDefault = [
  {
    title: 'Add Meal',
    link: '/mealpage'
  },
  {
    title: 'Orders',
    link: '/orderHistory'
  },
  {
    title: 'Log Out',
    link: '/'
  }
];

const adminNav = [
  {
    title: 'Set Menu',
    link: '/dashboard'
  },
  {
    title: 'Orders',
    link: '/orderHistory'
  },
  {
    title: 'Log Out',
    link: '/'
  }
];

const customerNav = [
  {
    title: 'Menu',
    link: '/dashboard'
  },
  {
    title: 'Cart',
    link: '/cart'
  },
  {
    title: 'Orders',
    link: '/orders'
  },

  {
    title: 'Log Out',
    link: '/'
  }
];

const navData = {
  customerNav,
  adminNav,
  adminNavDefault
};

export default navData;

