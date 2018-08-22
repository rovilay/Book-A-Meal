const adminNav = [
  {
    title: 'Manage Menus',
    link: '/dashboard'
  },
  {
    title: 'Manage Meals',
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
  adminNav
};

export default navData;
