
const navLinksDefaultState = [
  {
    title: 'Log In',
    link: '/login'
  },
  {
    title: 'Sign Up',
    link: '/signUp'
  }
];

const navLinksReducer = (state = navLinksDefaultState, action) => {
  switch (action.type) {
    case 'SET_NAV_BAR':
      return [...action.navData];
    case 'SET_DEFAULT_NAV':
      return [...navLinksDefaultState];
    default:
      return state;
  }
};


export default navLinksReducer;
