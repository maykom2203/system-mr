// const md5 = require('md5');
const { Sales } = require('../database/models');
// const { validate } = require('./auth.service');

const createSales = async ({ 
  user_id, total_price, delivery_address, delivery_number}) => {

  // const user = await Sales.findOne({ where: { id: user_id } });
  // const hast = md5(user.password).toString();
  // const { error, token } = await validateUser({ 
  //   name: user.name, email: user.email, password: hast });

  await Sales.create({ user_id, total_price, delivery_address, delivery_number });
  // const result = await Sales.findOne({ where: { user_id } });
  // console.log("CONSOLE",result.id)
  return  "Passou na service" ;
};

// const getUser = async () => User.findAll(
//   {
//     attributes: {
//       exclude: ['password'],
//     },
//   },
// );

// const getUserById = async (userId) => User.findAll({
//   where: { id: userId }, attributes: { exclude: ['password'] },
// });

module.exports = {
  createSales,
  // getUserById,
  // getUser,
};