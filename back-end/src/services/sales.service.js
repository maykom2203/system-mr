
const { Sales } = require('../database/models');

const createSales = async ({ 
  user_id, 
  // total_price, delivery_address, delivery_number
}) => {

  await Sales.create({ user_id, 
    // total_price, delivery_address, delivery_number 
  });

  return  "Passou na service" ;
};

module.exports = {
  createSales,

};