import React from 'react';
import { useNavigate } from 'react-router-dom';

function NavBar() {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  console.log('deu certo');
  return (
    <nav>
      <ul>
        <li>
          <a
            href="/customer/products"
            data-testid="customer_products__element-navbar-link-products"
          >
            PRODUTOS
          </a>
        </li>
        <li>
          <a
            href="/customer/orders"
            data-testid="customer_products__element-navbar-link-orders"
            onClick={ () => {
              navigate('/customer/orders');
            } }
          >
            MEUS PEDIDOS
          </a>
        </li>
        <li>
          <p
            data-testid="customer_products__element-navbar-user-full-name"
          >
            { user }
          </p>
        </li>
        <li>
          <a
            href="/"
            data-testid="customer_products__element-navbar-link-logout"
            onClick={ () => {
              localStorage.clear();
              navigate('/login');
            } }
          >
            Sair
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
