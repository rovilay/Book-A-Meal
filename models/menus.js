
module.exports = (sequelize, DataTypes) => {
  const Menu = sequelize.define('Menu', {
    id: DataTypes.INTEGER,
    date: {
      type: DataTypes.DATEONLY,
      primaryKey: true
  }
  });
  Menu.associate = function(models) {
    // associations can be defined here
  };
  return Menu;
};