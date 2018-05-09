
module.exports = (sequelize, DataTypes) => {
  const Meal = sequelize.define('Meal', {
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
    },
    UserId: {
      type: DataTypes.UUID,
      allowNull: false
    }

  });

  Meal.associate = (models) => {
    Meal.belongsTo(models.User, {foreignKey: 'UserId', targetKey: 'id'});
    Meal.belongsToMany(models.Menu, {
      through: 'MenuMeal', 
      foreignKey: 'MealId',
      otherKey: 'MenuId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'});
    Meal.belongsToMany(models.Order, {
      through: 'OrderMeal',
      foreignKey: 'MealId',
      otherKey: 'OrderId'
    });
  };
  return Meal;
};