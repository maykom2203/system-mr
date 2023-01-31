const { Sales } = require('../database/models');

const createSales = async ({ userId }) => {
  await Sales.create({ userId });

  return 'Passou na service';
};

module.exports = {
  createSales,

};