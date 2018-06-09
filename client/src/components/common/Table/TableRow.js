import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import TableCol from './TableCol';
import { deleteMealInCart } from '../../../actions/cart';

class TableRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: 0,
    };

    this.calcPrice = this.calcPrice.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
  }

  componentDidMount() {
    this.calcPrice();
  }

  calcPrice() {
    const { unitPrice, portion } = this.props.item;
    let price = 0;
    if (unitPrice && portion) {
      price += (unitPrice * portion);
    }

    this.setState({ price });
  }

  deleteRow() {
    const { sn, dispatch } = this.props;
    const id = sn - 1;
    dispatch(deleteMealInCart(id));
  }
  render() {
    const { item, sn } = this.props;
    const { price } = this.state;
    return (
      <tr key={item.id}>
        {
          Object.keys(item).map((key, i) => (
            (key === 'id')
            ?
            (<TableCol dataTitle={key} key={i} val={sn} />)
            :
            (<TableCol dataTitle={key} val={item[key]} key={i} />)
          ))
        }
        <td data-title="price">
          {price}
        </td>
        <td data-title="delete">
          <button
            className="btn-col btn-1"
            onClick={this.deleteRow}
          >
            delete
          </button>
        </td>
      </tr>
    );
  }
}

TableRow.propTypes = {
  item: PropTypes.object.isRequired,
  sn: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
  // cart: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  cart: state.cart
});

export default connect(mapStateToProps)(TableRow);
