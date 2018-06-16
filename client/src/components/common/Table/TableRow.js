import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import TableCol from './TableCol';

const TableRow = (props) => {
  const { item, sn, deleteRow } = props;
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

      <td data-title="delete">
        <button
          className="btn-col btn-1"
          onClick={() => {
            deleteRow(sn);
          }}
        >
          delete
        </button>
      </td>
    </tr>
  );
};

TableRow.propTypes = {
  item: PropTypes.object.isRequired,
  sn: PropTypes.number.isRequired,
  deleteRow: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  cart: state.cart
});

export default connect(mapStateToProps)(TableRow);
