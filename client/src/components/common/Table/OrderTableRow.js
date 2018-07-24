import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

import TableCol from './TableCol';

const OrderTableRow = (props) => {
  const {
    orderDetails,
    item,
    onEditOrder,
    deleteOrder,
    notify,
    orders,
    showDetails
  } = props;

  return (
    <tr key={item.id}>
      {
        Object.keys(item).map((key, i) => (
          (<TableCol dataTitle={key} val={item[key]} key={i} />)
        ))
      }
      {
        (item.orderId && !onEditOrder)
        &&
        <td data-title="view details">
          <a
            role="button"
            href="#"
            onClick={() => {
              showDetails(orderDetails);
            }}
            className="order-btn-col btn-1"
          >
            <FontAwesome
              name="info-circle"
              size="2x"
            />
          </a>
        </td>
      }
      {
        (item.orderId && onEditOrder)
        &&
        <td data-title="view details" className="orderHistory-action">
          <a
            role="button"
            href="#"
            onClick={() => {
              showDetails(orderDetails);
            }}
            className="btn-col btn-2"
          >
            <FontAwesome
              name="info-circle"
              size="2x"
            />
          </a>
          <a
            onClick={() => {
              onEditOrder(orderDetails);
            }}
            href="#"
            role="button"
            className="btn-col btn-2"
          >
            <FontAwesome
              name="edit"
              size="2x"
            />
          </a>
          <a
            onClick={() => {
              deleteOrder(item.orderId);
              notify(orders.serverRes.message);
            }}
            href="#"
            role="button"
            className="btn-col btn-2"
          >
            <FontAwesome
              name="times"
              size="2x"
            />
          </a>
        </td>
      }
    </tr>
  );
};

OrderTableRow.defaultProps = {
  onEditOrder: undefined,
  deleteOrder: undefined
};

OrderTableRow.propTypes = {
  item: PropTypes.object.isRequired,
  orderDetails: PropTypes.object.isRequired,
  onEditOrder: PropTypes.func,
  deleteOrder: PropTypes.func,
  notify: PropTypes.func.isRequired,
  showDetails: PropTypes.func.isRequired,
  orders: PropTypes.object.isRequired,
};

export default OrderTableRow;
