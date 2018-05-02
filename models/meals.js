
module.exports = (sequelize, DataTypes) => {
  const Meals = sequelize.define('Meals', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull:false,
      defaultValue: 'https://img.com'
    }

  });

  Meals.associate = (models) => {
    // Meals.belongsTo(models.menu, {
    //   foreignKey: 'menuId',
    //   onDelete: 'CASCADE'
    // });
  };
  return Meals;
};