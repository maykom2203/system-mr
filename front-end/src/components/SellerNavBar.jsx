import React from 'react';
import { useNavigate } from 'react-router-dom';

function SellerNavBar() {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  return (
    <nav>
      <ul>
        <li>
          <a
            href="/seller/orders"
            data-testid="customer_products__element-navbar-link-orders"
          >
            PEDIDOS
          </a>
        </li>
        <li>
          <p data-testid="customer_products__element-navbar-user-full-name">
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

export default SellerNavBar;
