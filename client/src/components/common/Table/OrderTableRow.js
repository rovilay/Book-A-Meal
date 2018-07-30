import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import swal from 'sweetalert';
import moment from 'moment';

import TableCol from './TableCol';

const OrderTableRow = (props) => {
  const {
    orderDetails,
    item,
    onEditOrder,
    deleteOrder,
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
          {
            // display only if order can still be edited
            (moment(props.orderCreatedAt).add(15, 'm') > moment())
            &&
            <a
              onClick={() => {
                onEditOrder(orderDetails);
              }}
              href="#"
              role="button"
              className="btn-col btn-2 yellow"
            >
              <FontAwesome
                name="edit"
                size="2x"
              />
            </a>
          }
          {
            // display only if order can still be canceled
            (moment(props.orderCreatedAt).add(15, 'm') > moment())
            &&
            (
              <a
                onClick={() => {
                  swal({
                    text: 'Are you sure you want to delete this order?',
                    buttons: true,
                    dangerMode: true,
                  })
                    .then((confirmed) => {
                      if (confirmed) {
                        deleteOrder(item.orderId);
                      }
                    })
                    .catch(err => err);
                }}
                href="#"
                role="button"
                className="btn-col btn-2 danger"
              >
                <FontAwesome
                  name="trash"
                  size="2x"
                />
              </a>
            )
          }
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
  showDetails: PropTypes.func.isRequired,
  orderCreatedAt: PropTypes.string.isRequired
};

export default OrderTableRow;
