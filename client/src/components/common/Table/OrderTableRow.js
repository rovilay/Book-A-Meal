import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

import TableCol from './TableCol';

const OrderTableRow = (props) => {
  const {
    setModal,
    orderDetails,
    item,
    setEditOrder,
    deleteOrder
  } = props;

  const showDetails = () => {
    setModal({
      isOpen: true,
      isInfo: true,
      isEdit: false,
      close: false,
      contentLabel: 'Order details',
      content: { ...orderDetails }
    });
  };

  const editOrder = () => {
    const { orderId, meals } = orderDetails;
    const orderedMeals = [];
    let totalPrice = 0;

    meals.map((meal) => {
      const {
        id,
        title,
        price: unitPrice,
        OrderMeal
      } = meal;
      const { portion } = OrderMeal;
      const price = unitPrice * portion;
      totalPrice += price;
      orderedMeals.push({
        id,
        title,
        unitPrice,
        portion,
        price
      });
    });

    setModal({
      isOpen: true,
      isEdit: true,
      isInfo: false,
      close: false,
      contentLabel: 'Edit Order',
      content: { ...orderDetails }
    });

    setEditOrder({
      orderId,
      deliveryAddress: orderDetails.address,
      orderedMeals,
      totalPrice
    });
  };

  return (
    <tr key={item.id}>
      {
        Object.keys(item).map((key, i) => (
          (<TableCol dataTitle={key} val={item[key]} key={i} />)
        ))
      }
      {
        item.orderId
        &&
        <td data-title="view details">
          <a
            role="button"
            href="#"
            onClick={showDetails}
            className="btn-col btn-2"
          >
            <FontAwesome
              name="info-circle"
              size="2x"
            />
          </a>
          <a
            onClick={editOrder}
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

OrderTableRow.propTypes = {
  item: PropTypes.object.isRequired,
  orderDetails: PropTypes.object.isRequired,
  setModal: PropTypes.func.isRequired,
  setEditOrder: PropTypes.func.isRequired,
  deleteOrder: PropTypes.func.isRequired
};

export default OrderTableRow;
