module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('products', {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: DataTypes.STRING,
      price: DataTypes.DECIMAL(4,2),
      url_image: DataTypes.STRING,
      
      
    }, {
      tableName: 'products',
      timestamps: false,
      underscored: true,
    });
    // User.associate = (model) => {
    //   User.hasMany(model.BlogPost, {
    //     foreignKey: 'userId',
    //     as: 'blogPost',
    //   })
    // }
    return Product;
  };