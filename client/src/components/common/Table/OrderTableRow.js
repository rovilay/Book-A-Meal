import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';

import setModal from '../../../actions/modal';
import { setEditOrder } from '../../../actions/orders';
import TableCol from './TableCol';

class TableRow extends Component {
  constructor(props) {
    super(props);

    this.showDetails = this.showDetails.bind(this);
    this.editOrder = this.editOrder.bind(this);
  }

  showDetails() {
    const { dispatch, orderDetails } = this.props;
    dispatch(setModal({
      isOpen: true,
      isInfo: true,
      isEdit: false,
      close: false,
      contentLabel: 'Order details',
      content: { ...orderDetails }
    }));
  }

  editOrder() {
    const { dispatch, orderDetails } = this.props;
    const { meals } = orderDetails;
    const orderedMeals = [];
    meals.map((meal) => {
      const {
        id,
        title,
        price: unitPrice,
        OrderMeal
      } = meal;
      const { portion } = OrderMeal;
      const price = unitPrice * portion;
      const item = {
        id,
        title,
        unitPrice,
        portion,
        price
      };
      orderedMeals.push(item);
    });

    dispatch(setModal({
      isOpen: true,
      isEdit: true,
      isInfo: false,
      close: false,
      contentLabel: 'Edit Order',
      content: { ...orderDetails }
    }));

    dispatch(setEditOrder({
      deliveryAddress: orderDetails.address,
      orderedMeals
    }));
  }

  render() {
    const { item } = this.props;

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
              onClick={this.showDetails}
              className="btn-col btn-2"
            >
              <FontAwesome
                name="info-circle"
                size="2x"
              />
            </a>
            <a
              onClick={this.editOrder}
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
              onClick={this.showDetails}
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
  }
}

TableRow.propTypes = {
  item: PropTypes.object.isRequired,
  orderDetails: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  cart: state.cart,
  orders: state.order
});

export default connect(mapStateToProps)(TableRow);
