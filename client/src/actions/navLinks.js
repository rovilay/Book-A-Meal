
export const setNav = navLinks => ({
  type: 'SET_NAV_BAR',
  navData: [...navLinks]
});

export const setDefaultNav = () => ({
  type: 'SET_DEFAULT_NAV'
});

