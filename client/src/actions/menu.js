const setTodayMenu = ({
  success: gotMenu,
  message,
  Meals = []
}) => (
  {
    type: 'SET_TODAY_MENU',
    menu: {
      message,
      gotMenu,
      Meals
    }
  }
);

export default setTodayMenu;
