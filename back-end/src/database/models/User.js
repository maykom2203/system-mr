module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement:true
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    
  }, {
    tableName: 'users',
    timestamps: false,
    underscored: true,
  });
  // User.associate = (model) => {
  //   User.hasMany(model.BlogPost, {
  //     foreignKey: 'userId',
  //     as: 'blogPost',
  //   })
  // }
  return User;
};