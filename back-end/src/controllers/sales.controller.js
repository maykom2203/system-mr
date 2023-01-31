const salesService = require('../services/sales.service');
const { validateToken } = require('../utils/jwt.util');
const { Sales } = require('../database/models');

const createSales = async (req, res) => {
  // const response = await salesService.createSales(req.body);
  const { authorization } = req.headers;
  // console.log("AUTHORIZATION",authorization)
  const { message } = await validateToken(authorization);

  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }
  if (message) {
    return res.status(401).json({ message });
  }
  // console.log("CONSOLE teste")
    const sale = await salesService.createSales(req.body);
    if(sale === "Passou na service"){
      const { user_id } = req.body
      const result = await Sales.findOne({ where: { user_id } })
      return res.status(200).json({id:result.id});
    }
    
  

};

// const getUser = async (req, res) => {
//   const { authorization } = req.headers;
//   const { message } = await validateToken(authorization);

//   if (!authorization) {
//     return res.status(401).json({ message: 'Token not found' });
//   }
//   if (message) {
//     return res.status(401).json({ message });
//   }
//   const user = await userService.getUser();

//   return res.status(200).json(user);
// }; 

// const getUserById = async (req, res) => {
//   const { id } = req.params;
//   const { authorization } = req.headers;
//   const { message } = await validateToken(authorization);

//   if (!authorization) {
//     return res.status(401).json({ message: 'Token not found' });
//   }
//   if (message) {
//     return res.status(401).json({ message });
//   }
//   const user = await userService.getUserById(id);
//   if (user.length === 0) {
//     return res.status(404).json({
//       message: 'User does not exist',
//     });
//   }
//   return res.status(200).json(user[0]);
// }; 

module.exports = {
  createSales,
  // getUser,
  // getUserById,
};