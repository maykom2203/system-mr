import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../../components/ProductCard';
import NavBar from '../../components/NavBar';
import { requestProducts } from '../../services/requests';

function Products() {
  const replaceValue = (string) => string.replace('.', ',');
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const AllProducts = await requestProducts();
      setProducts(AllProducts);
    };
    fetchProducts();
  }, [setCart]);

  const totalCart = cart.reduce((acc, curr) => acc + (curr.quantity * curr.unitPrice), 0);
  const navigate = useNavigate();
  function handleProductsClick() {
    navigate('/customer/checkout');
  }

  return (
    <>
      <NavBar />
      <div>
        <div>
          <button
            type="submit"
            data-testid="customer_products__button-cart"
            onClick={ handleProductsClick }
            disabled={ cart.length === 0 }
          >
            Ver Carrinho: R$
            {' '}
            <span
              data-testid="customer_products__checkout-bottom-value"
            >
              { replaceValue(totalCart.toFixed(2)) }
            </span>
          </button>
        </div>
        <div>
          { products.map((product) => (
            <ProductCard
              key={ product.id }
              id={ product.id }
              name={ product.name }
              price={ product.price }
              urlImage={ product.url_image }
              cart={ cart }
              setCart={ setCart }
            />)) }
        </div>
      </div>
    </>
  );
}

export default Products;
