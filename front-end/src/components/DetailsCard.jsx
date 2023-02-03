import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment/moment';

function DetailsCard({
  saleId,
  status,
  saleDate,
}) {
  const dataDetails = 'customer_order_details__element-';
  let statusOrder = '';

  if (status === 'Preparando') {
    statusOrder = 'order-status-preparing';
  }

  if (status === 'Entregue') {
    statusOrder = 'order-status-delivery';
  }

  const handleDateOfSale = (date) => {
    const result = moment(date).format('DD/MM/YYYY');
    return result;
  };

  return (
    <div>
      <h3>Detalhe do Pedido</h3>
      <div>
        <span data-testid={ `${dataDetails}order-details-label-order-id` }>
          {`${saleId}`}
        </span>
        <span data-testid={ `${dataDetails}order-details-label-seller-name` }>
          Fulana Pereira
        </span>
        <span data-testid={ `${dataDetails}order-details-label-order-date` }>
          { handleDateOfSale(saleDate)}
        </span>
        <span
          className={ `order-status ${statusOrder}` }
          data-testid={ `${dataDetails}order-details-label-delivery-status${saleId}` }
        >
          { status }

        </span>

      </div>
      <button
        data-testid="customer_order_details__button-delivery-check"
        type="button"
        disabled
      >
        MARCAR COMO ENTREGUE
      </button>
    </div>
  );
}

DetailsCard.propTypes = {
  saleId: PropTypes.number,
  order: PropTypes.string,
  status: PropTypes.string,
}.isRequired;

export default DetailsCard;
