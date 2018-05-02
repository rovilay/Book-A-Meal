
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    Phone: {
      type: DataTypes.STRING,
      allowNull: false
    }
    // DateJoined: {
    //   type: DataTypes.DATEONLY,
    //   allowNull: false,
    //   defaultValue: DataTypes.NOW
    // }
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};