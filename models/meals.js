
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
    }

  });

  Meal.associate = (models) => {
    Meal.hasMany(models.Order, {
      through: models.OrderedMeals,
      onDelete: 'CASCADE'
    });
  };
  return Meal;
};