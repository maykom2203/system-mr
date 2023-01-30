import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestProducts } from '../../services/requests';

function CheckoutForm({ cart }) {
  const [idSeller, setIdSeller] = useState('');
  const [addressCustomer, setCustomerAddress] = useState('');
  const [numberAddress, setNumbersAddress] = useState('');
  const [sellers, setSellers] = useState([]);
  const [isAble, setIsAble] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const sellerUpd = async () => {
      const data = await requestProducts();
      setSellers(data);
    };
    sellerUpd();
  }, []);

  useEffect(() => {
    if (idSeller !== '' && addressCustomer !== '' && numberAddress) {
      setIsAble(true);
    }
  }, [idSeller, addressCustomer, numberAddress]);

  const handleClick = async () => {
    const { id, token } = JSON.parse(localStorage.getItem('user'));
    const body = {
      userId: id,
      idSeller,
      totalPrice: cart.reduce((acc, curr) => acc + Number(curr.subTotal), 0).toFixed(2),
      setCustomerAddress,
      setNumbersAddress,
      orders: cart.map(({ productId, quantity }) => ({ productId, quantity })),
    };

    const { data } = await api.post(
      'http://localhost:3001/customer/orders',
      body,
      { headers: { Authorization: `${token}` } },
    );
    navigate({
      pathname: `/customer/orders/${data.id}`,
      state: data.id,
    });
    localStorage.setItem('carrinho', JSON.stringify([]));
  };

  return (
    <form>
      <h3 className="checkout-form-title">Endereço para Entrega:</h3>
      <label htmlFor="seller">
        P. Vendedora Responsável:
        <select
          data-testid="customer_checkout__select-seller"
          name="seller"
          id="seller"
          value={ idSeller }
          onChange={ ({ target: { value } }) => setIdSeller(value) }
        >
          <option value="default">Selecionar</option>
          {sellers.length > 0 && sellers.map(({ name, id }) => (
            <option key={ `sellers-${id}` } value={ id }>
              {name}
            </option>
          ))}
        </select>
      </label>

      <label htmlFor="customer_address">
        Endereço:
        <input
          type="text"
          data-testid="customer_checkout__input-address"
          value={ setNumbersAddress }
          onChange={ ({ target: { value } }) => setNumbersAddress(value) }
        />
      </label>

      <label htmlFor="address_number">
        Número:
        <input
          type="text"
          data-testid="customer_checkout__input-address-number"
          value={ setNumbersAddress }
          onChange={ ({ target: { value } }) => setNumbersAddress(value) }
        />
      </label>
      <button
        disabled={ isAble }
        data-testid="customer_checkout__button-submit-order"
        type="button"
        onClick={ handleClick }
      >
        FINALIZAR PEDIDO
      </button>
    </form>
  );
}

CheckoutForm.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.instanceOf(Object)).isRequired,
};

export default CheckoutForm;
