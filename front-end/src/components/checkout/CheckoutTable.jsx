import PropTypes from 'prop-types';

function CheckoutTable({
  buttonOn,
  cart,
  setCart,
}) {
  const handleRemove = (removeIndex) => {
    const filterCart = cart.filter((_, index) => index !== removeIndex);
    localStorage.setItem('carrinho', JSON.stringify(filterCart));
    setCart(filterCart);
  };
  const replaceValue = (string) => string.replace('.', ',');

  const total = cart.reduce((acc, curr) => acc + Number(curr.subTotal), 0);

  return (
    <section>
      { cart.length === 0 ? (<h3>Você não adicionou produtos</h3>) : (
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Descrição</th>
              <th>Quantidade</th>
              <th>Valor Unitário</th>
              <th>Sub-total</th>
              {buttonOn && <th>Remover Item</th>}
            </tr>
          </thead>
          <tbody>
            {cart.map((order, index) => (
              <tr key={ index }>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-item-number-${index}`
                  }
                >
                  { index + 1 }

                </td>
                <td
                  data-testid={ `customer_checkout__element-order-table-name-${index}` }
                >
                  { order.name }

                </td>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-quantity-${index}`
                  }
                >
                  { order.quantity }

                </td>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-unit-price-${index}`
                  }
                >
                  {replaceValue(order.unitPrice) }
                </td>
                <td
                  data-testid={
                    `customer_checkout__element-order-table-sub-total-${index}`
                  }
                >
                  { replaceValue(order.subTotal.toFixed(2)) }

                </td>
                {buttonOn && (
                  <td>
                    <button
                      data-testid={
                        `customer_checkout__element-order-table-remove-${index}`
                      }
                      type="button"
                      onClick={ () => handleRemove(index) }
                    >
                      Remover
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
          {/* APAGAR ESSA CADEIA DE TFOOT CASO ALGUM REQUISITO DE ERRADO */}
          <tfoot>
            <tr>
              <td>
                <p
                  className="total-price"
                  data-testid="customer_checkout__element-order-total-price"
                >
                  {`Total: R$${replaceValue(total.toFixed(2))}`}

                </p>
              </td>
            </tr>
          </tfoot>
        </table>
      )}
    </section>
  );
}

CheckoutTable.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.instanceOf(Object)).isRequired,
  buttonOn: PropTypes.bool.isRequired,
  setCart: PropTypes.func.isRequired,
};

export default CheckoutTable;
