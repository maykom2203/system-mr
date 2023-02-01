const salesService = require('../services/sales.service');
const { validateToken } = require('../utils/jwt.util');
const { Sales } = require('../database/models');

const createSales = async (req, res) => {
  console.log(req.body)
  const { authorization } = req.headers;
  const { message } = await validateToken(authorization);

  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }
  if (message) {
    return res.status(401).json({ message });
  }
    const sale = await salesService.createSales(req.body);
    if (sale === 'Passou na service') {
      const { userId } = req.body;
      console.log(userId);
      const result = await Sales.findAll({ where: { userId } });
      let array = [];
      const map = result.map((sale)=>{
        array.push(sale.dataValues.id)
      })
      console.log(array)
      return res.status(201).json({ id: array[array.length - 1] });
    }
};

module.exports = {
  createSales,
};