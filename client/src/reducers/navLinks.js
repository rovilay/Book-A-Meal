
const navLinksReducersDefaultState = [
  {
    title: 'Log In',
    link: '/login'
  },
  {
    title: 'Sign Up',
    link: '/signUp'
  }
];

const navLinksReducer = (state = navLinksReducersDefaultState, action) => {
  switch (action.type) {
    case 'SET_NAV_BAR':
      return [...action.navData];
    default:
      return state;
  }
};


export default navLinksReducer;
