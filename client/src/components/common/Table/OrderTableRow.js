import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import TableCol from './TableCol';

class TableRow extends Component {
  render() {
    const { item } = this.props;
    return (
      <tr key={item.id}>
        {
          Object.keys(item).map((key, i) => (
            (<TableCol dataTitle={key} val={item[key]} key={i} />)
          ))
        }
      </tr>
    );
  }
}

TableRow.propTypes = {
  item: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  cart: state.cart
});

export default connect(mapStateToProps)(TableRow);
