const { INTEGER } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Sales = sequelize.define('Sales', {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    user_id: DataTypes.INTEGER,
    seller_id: DataTypes.INTEGER,
    total_price: DataTypes.DECIMAL(9,2),
    sales_date: DataTypes.DATE,
    total_price: DataTypes.STRING,
    delivery_adress: DataTypes.STRING,
    delivery_number: DataTypes.STRING,
    status: DataTypes.STRING,
    
  }, {
    tableName: 'sales',
    timestamps: false,
    underscored: true,
  });
  // User.associate = (model) => {
  //   User.hasMany(model.BlogPost, {
  //     foreignKey: 'userId',
  //     as: 'blogPost',
  //   })
  // }
  return Sales;
};