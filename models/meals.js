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
      allowNull: false,
      defaultValue: 'https://res.cloudinary.com/dcqnswemi/image/upload/v1529300780/default_meal_img.jpg'
    }
  }, {
    paranoid: true,
    indexes: [{
      unique: true,
      fields: ['title', 'UserId', 'deletedAt']
    }]
  });

  Meal.associate = (models) => {
    Meal.belongsTo(models.User, {
      foreignKey: 'UserId',
      targetKey: 'id',
      onDelete: 'CASCADE',
      unique: 'mealTitle'
    });
    Meal.belongsToMany(models.Menu, {
      through: 'MenuMeal',
      foreignKey: 'MealId',
      otherKey: 'MenuId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    Meal.belongsToMany(models.Order, {
      through: 'OrderMeal',
      foreignKey: 'MealId',
      otherKey: 'OrderId'
    });
  };
  return Meal;
};
