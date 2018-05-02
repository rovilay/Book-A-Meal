
module.exports = (sequelize, DataTypes) => {
  const Menus = sequelize.define('Menus', {
    id: DataTypes.INT
    date: {
      type: DataTypes.DATEONLY,

  });
  Menus.associate = function(models) {
    // associations can be defined here
  };
  return Menus;
};