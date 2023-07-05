import React, { useEffect, useState } from 'react';
import moment from 'moment/moment';
// import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar';
// import SellerOrderDetailsCard from '../../components/SellerOrderDetailsCard';
import {
  requestSalesData,
  // requestSalesProducts,
} from '../../services/requests';

function Details() {
  const [customerOrder, setCustomerOrder] = useState([]);
  const [saleId, setsaleId] = useState();
  // const [salesProducts, setsalesProducts] = useState([]);
  const [allProducts, setallProducts] = useState([]);

  useEffect(() => {
    setsaleId(JSON.parse(localStorage.getItem('saleId')));

    const fetchAllProducts = async () => {
      const AllProducts = await JSON.parse(localStorage.getItem('carrinho'));
      console.log(AllProducts);
      setallProducts(AllProducts);
    };
    fetchAllProducts();

    // const fetchSalesProducts = async () => {
    //   const { data } = await requestSalesProducts();
    //   setsalesProducts(data);
    // };
    // fetchSalesProducts();

    const fetchCustomerOrders = async () => {
      const { data } = await requestSalesData();
      setCustomerOrder(data);
    };
    fetchCustomerOrders();
  }, []);

  const sale = customerOrder.filter((sal) => sal.id === saleId)[0];
  const handleDateOfSale = (date) => {
    const result = moment(date).format('DD/MM/YYYY');
    return result;
  };
  // const replaceValue = (string) => string.replace('.', ',');
  // // const result = salesProducts.filter(
  // //   (sal) => sal.saleId === saleId,
  // // );

  const dataStats = 'customer_order_details__element-order-details-label-delivery-status';
  const dataDate = 'customer_order_details__element-order-details-label-order-date';
  const dataDelivery = 'customer_order_details__button-delivery-check';
  // const dataSend = 'seller_order_details__button-dispatch-check';
  const dataSeller = 'customer_order_details__element-order-details-label-seller-name';
  const dataNumber = 'customer_order_details__element-order-table-item-number';
  const dataName = 'customer_order_details__element-order-table-name';
  const dataQuantity = 'customer_order_details__element-order-table-quantity';
  const dataUnity = 'customer_order_details__element-order-table-unit-price';
  const dataSub = 'customer_order_details__element-order-table-sub-total';
  const total = allProducts.reduce((acc, curr) => acc + Number(curr.subTotal), 0);

  return (
    <>
      <NavBar />
      {customerOrder.length === 0 ? <p>Loading ...</p>
        : (
          <div>
            {' '}
            <div>
              <br />
              <span
                data-testid="customer_order_details__element-order-details-label-order-id"
              >
                PEDIDO
                {' '}
                {/* {console.log(sale.id)} */}
                {console.log(sale)}
                {sale.id}
                {/* {' '} */}
              </span>
              <span
                data-testid={ dataSeller }
              >
                {' '}
                Fulana Pereira
              </span>
              <span
                data-testid={ dataDate }
              >
                {' '}
                {handleDateOfSale(sale.sale_date)}
              </span>
              <span
                data-testid={ dataStats }
              >
                {' '}
                {sale.status}
              </span>
            </div>
            <br />
            <button
              type="button"
              disabled
              data-testid={ dataDelivery }
            >
              MARCAR COMO ENTREGE
              {' '}
            </button>
            {/* <button
              type="button"
              disabled
              data-testid={ dataSend }
            >
              SAIU PARA ENTREGA
              {' '}
            </button> */}

            <table>
              <thead>
                <td>Item</td>
                <td>Descrição</td>
                <td>Quantidade</td>
                <td>Valor Unitário</td>
                <td>Sub-total</td>

              </thead>
              {/* {console.log('cjxncj', allProducts)}
              {(salesProducts.filter(
                (sal) => sal.saleId === saleId,
              ))} */}
              {allProducts.map((product, index) => (
                <tbody
                  key={ product.productId }
                >
                  <td
                    data-testid={ `${dataNumber}-${index}` }
                  >
                    {index + 1}

                  </td>
                  <td
                    data-testid={ `${dataName}-${index}` }
                  >

                    {product.name}

                  </td>
                  <td
                    data-testid={ `${dataQuantity}-${index}` }
                  >
                    {product.quantity}

                  </td>
                  <td
                    data-testid={ `${dataUnity}-${index}` }
                  >
                    {product.price}

                  </td>
                  <td
                    data-testid={ `${dataSub}-${index}` }
                  >
                    {product.subTotal}

                  </td>
                </tbody>
              ))}
            </table>
            <div
              data-testid="customer_order_details__element-order-total-price"
            >
              <br />
              {' '}
              {total.toFixed(2).replace(/\./, ',')}
            </div>

          </div>
        )}
    </>
  );
}

export default Details;
