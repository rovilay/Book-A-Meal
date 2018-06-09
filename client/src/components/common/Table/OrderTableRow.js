import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import setModal from '../../../actions/modal';
import TableCol from './TableCol';

class TableRow extends Component {
  constructor(props) {
    super(props);

    this.showDetails = this.showDetails.bind(this);
  }

  showDetails() {
    const { dispatch, orderDetails } = this.props;
    dispatch(setModal({
      isOpen: true,
      close: false,
      contentLabel: 'Order details',
      content: { ...orderDetails }
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
            <button
              onClick={this.showDetails}
              className="btn-col btn-1"
            >
            view details
            </button>
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
