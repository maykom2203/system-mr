const { Sales } = require('../database/models');
const { SalesProducts } = require('../database/models');

const createSales = async ({ 
  userId, 
  totalPrice, 
  deliveryAddress, 
  deliveryNumber, 
  dateTime,
  sellerId,
  saleInfos
}) => {
  // CRIA UMA SALE NA TABELA
  const toSnakeCase = (e) => {
    return e.match(/([A-Z])/g).reduce(
      (str, c) => str.replace(new RegExp(c), '_' + c.toLowerCase()),
      e
    )
    .substring((e.slice(0, 1).match(/([A-Z])/g)) ? 1 : 0);
  };
  // str_to_date(dateTime, '%Y-%m-%dT%H:%i:%sZ')
  await Sales.create({
    [toSnakeCase("userId")]: userId, 
    [toSnakeCase("totalPrice")]: totalPrice, 
    [toSnakeCase("deliveryAddress")]: deliveryAddress, 
    [toSnakeCase("deliveryNumber")]: deliveryNumber,
    [toSnakeCase("saleDate")]: Date.parse(dateTime),
    [toSnakeCase("sellerId")]: sellerId,
    status:"Pendente"
     });

  // ATUALIZA A PRODUTCS SALE 
  const result = await Sales.findAll({ where: { userId } });
      let array = [];
      const map = result.map((sale)=>{
        array.push(sale.dataValues.id)
      })

  const dbInput = saleInfos.map(async (product)=>{
    console.log("Sale Infos", saleInfos)
    await SalesProducts.create({
       saleId: array[array.length - 1], 
       productId: product.productId,
       quantity: product.quantity,
      });
  })



  return 'Passou na service';
};



module.exports = {
  createSales,

};