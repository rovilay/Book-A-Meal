import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import TableCol from './TableCol';

const TableRow = (props) => {
  const { item, sn, deleteRow } = props;

  const changePortion = (portion) => {
    props.addMealToCart({ ...item, portion });
  };

  return (
    <tr key={item.id}>
      {
        Object.keys(item).map((key, i) => (
          (key === 'id')
            ?
            (<TableCol itemId={item.id} dataTitle={key} key={i} val={sn} />)
            :
            (<TableCol
              dataTitle={key}
              val={item[key]}
              itemId={item.id}
              key={i}
              changePortion={changePortion}
            />)
        ))
      }

      <td data-title="delete">
        <button
          className="btn-col btn-1 del-btn"
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

TableRow.defaultProps = {
  addMealToCart: undefined
};

TableRow.propTypes = {
  item: PropTypes.object.isRequired,
  sn: PropTypes.number.isRequired,
  deleteRow: PropTypes.func.isRequired,
  addMealToCart: PropTypes.func
};

const mapStateToProps = state => ({
  cart: state.cart
});

export default connect(mapStateToProps)(TableRow);
