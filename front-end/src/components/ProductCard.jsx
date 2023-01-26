import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export default function ProductCard({
  id,
  name,
  price,
  urlImage,
  setCart }) {
  const [qtdValue, setQtyValue] = useState(0);

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem('carrinho')) || [];
    const findProduct = storage.find((product) => product.productId === id);
    if (findProduct) {
      setQtyValue(findProduct.quantity);
    }
  }, [id]);

  const replaceValue = (string) => string.replace('.', ',');

  const updateCart = (opt) => {
    const storage = JSON.parse(localStorage.getItem('carrinho')) || [];
    const productIndex = storage.findIndex((product) => product.productId === id);
    if (productIndex < 0) {
      storage.push({
        productId: id,
        name,
        quantity: 1,
        unitPrice: price,
        subTotal: Number(price),
      });
    }
    const qtdUpdate = opt === '+' ? (qtdValue + 1) : (qtdValue - 1);
    const storageUpd = storage.map((product, index) => {
      if (index === productIndex) {
        return {
          ...product,
          quantity: qtdUpdate,
          subTotal: Number(price) * qtdUpdate,
        };
      }
      return product;
    }).filter((product) => product.quantity > 0);
    localStorage.setItem('carrinho', JSON.stringify(storageUpd));
    setCart(storageUpd);
  };

  const updCartInput = (number) => {
    const storage = JSON.parse(localStorage.getItem('carrinho')) || [];
    const idProduct = storage.findIndex((product) => product.productId === id);
    if (idProduct < 0) {
      storage.push({
        productId: id,
        name,
        quantity: number,
        unitPrice: price,
        subTotal: Number(price),
      });
    }
    const storageUpd = storage.map((product, index) => {
      if (index === productIndex) {
        return {
          ...product,
          quantity: number,
          subTotal: Number(price) * number,
        };
      }
      return product;
    }).filter((product) => product.quantity > 0);
    localStorage.setItem('carrinho', JSON.stringify(storageUpd));
    setCart(storageUpd);
  };

  const sumValue = () => {
    const sum = qtdValue + 1;
    setQtyValue(sum);
    updateCart('+');
  };

  const deductValue = () => {
    const deduct = qtdValue - 1;
    setQtyValue(deduct);
    updateCart('-');
  };

  const handleInputChange = ({ target }) => {
    updCartInput(Number(target.value));
    setQtyValue(Number(target.value));
  };

  return (
    <div>
      <img
        data-testid={ `customer_products__img-card-bg-image-${id}` }
        src={ urlImage }
        alt={ name }
      />
      <p
        data-testid={ `customer_products__element-card-title-${id}` }
      >
        {name}
      </p>
      R$
      {' '}
      <span
        data-testid={ `customer_products__element-card-price-${id}` }
      >
        { replaceValue(price) }
      </span>
      <div>
        <button
          type="button"
          onClick={ () => sumValue() }
          data-testid={ `customer_products__button-card-add-item-${id}` }
        >
          +
        </button>
        <input
          type="number"
          data-testid={ `customer_products__input-card-quantity-${id}` }
          value={ qtdValue }
          onChange={ handleInputChange }
        />
        <button
          type="button"
          disabled={ (qtdValue === 0) }
          onClick={ () => deductValue() }
          data-testid={ `customer_products__button-card-rm-item-${id}` }
        >
          -
        </button>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  urlImage: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  setCart: PropTypes.func.isRequired,
};
