module.exports = (sequelize, DataTypes) => {
  const SalesProducts = sequelize.define('SalesProducts', {
      saleId: {
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
      },
      productId: DataTypes.INTEGER ,
      quantity: DataTypes.INTEGER,
  }, {
      tableName: 'salesProducts',
      underscored: true,
      timestamps: false
  })

  SalesProducts.associate = (models) => {
      models.Sales.belongsToMany(models.Sales, {
          as: 'sales', 
          foreignKey: 'saleId',
          otherKey: 'productId',
          through: SalesProduct,
      });
      models.Products.belongsToMany(models.Products, {
          as: 'products', 
          foreignKey: 'productId',
          otherKey: 'saleId',
          through: SalesProducts,
      });
  }

  return SalesProducts;
}  