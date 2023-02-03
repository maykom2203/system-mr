import React, { useEffect, useState } from 'react';
import DetailsCard from '../../components/DetailsCard';
import NavBar from '../../components/NavBar';
import { requestSalesData } from '../../services/requests';

function Details() {
  const [customerProduct, setCustomerProduct] = useState([]);
  const [customerOrder, setCustomerOrder] = useState([]);
  const [customerPedido, setCustomerPedido] = useState();
  const dataDetails = 'customer_order_details__element-';
  useEffect(() => {
    const fetchCustomerOrders = async () => {
      const { data } = await requestSalesData();
      const pedido = data.length;
      setCustomerPedido(pedido);
      const result = data.filter((sale) => sale.id === data.length - 1);
      setCustomerOrder(result);
    };

    const handleSaleProduct = async () => {
      const saleInfos = await JSON.parse(localStorage.getItem('carrinho'));
      console.log('hxbxhsb', saleInfos);
      setCustomerProduct(saleInfos);
    };
    fetchCustomerOrders();
    handleSaleProduct();
  }, []);
  const total = customerProduct.reduce((acc, curr) => acc + Number(curr.subTotal), 0);

  return (
    <>
      <NavBar />
      <div>
        { customerOrder.map((product, index) => (
          <DetailsCard
            key={ product.id }
            saleId={ customerPedido }
            userId={ product.userId }
            order={ `${index + 1}` }
            status={ product.status }
            saleDate={ product.sale_date }
          />
        ))}
      </div>

      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
          </tr>
        </thead>
        <tbody>
          {customerProduct.map(({ productId, name, unitPrice, quantity, subTotal,
          }) => (
            <tr key={ productId }>
              <td data-testid={ `${dataDetails}order-table-item-number-${productId}` }>
                {' '}
                {productId}
                {' '}
              </td>
              <td data-testid={ `${dataDetails}order-table-name-${productId}` }>
                {' '}
                {name}
                {' '}
              </td>
              <td data-testid={ `${dataDetails}order-table-quantity-${productId}` }>
                {' '}
                {quantity}
                {' '}
              </td>
              <td data-testid={ `${dataDetails}order-table-unit-price-${productId}` }>
                {' '}
                {unitPrice}
                {' '}
              </td>
              <td data-testid={ `${dataDetails}order-table-sub-total-${productId}` }>
                {' '}
                {subTotal}
                {' '}
              </td>

            </tr>

          ))}
          <h1
            data-testid={ `${dataDetails}order-total-price` }
          >
            {total.toFixed(2).replace(/\./, ',')}
          </h1>
        </tbody>
      </table>

    </>
  );
}

export default Details;
