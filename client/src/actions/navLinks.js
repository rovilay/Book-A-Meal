/**
 * @export setNav - action generator for setting navigation links
 *
 * @param {Array} navLinks - array of navlinks objects
 * @returns {Object} - action with properties type 'SET_NAV_BAR' and navData
 */
export const setNav = navLinks => ({
  type: 'SET_NAV_BAR',
  navData: [...navLinks]
});

/**
 * @export setDefaultNav - action generator for setting homepage navigation links
 *
 * @returns {Object} - action with properties type 'SET_DEFAULT_NAV'
 */
export const setDefaultNav = () => ({
  type: 'SET_DEFAULT_NAV'
});

