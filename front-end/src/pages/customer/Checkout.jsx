import { useEffect, useState } from 'react';
import CheckoutForm from '../../components/checkout/CheckoutForm';
import CheckoutTable from '../../components/checkout/CheckoutTable';
import NavBar from '../../components/NavBar';

export default function Checkout() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem('carrinho'));
    setCart(storage);
    setLoading(false);
  }, [setCart]);

  return (
    <>
      <NavBar />
      <div>

        <section>
          <h3>FINALIZAR PEDIDO</h3>
          <CheckoutTable
            buttonOn
            data-testid="customer_checkout__element-order-table"
            cart={ cart }
            setCart={ setCart }
          />

        </section>

        <section>
          <CheckoutForm cart={ cart } />
        </section>
      </div>

    </>
  );
}
