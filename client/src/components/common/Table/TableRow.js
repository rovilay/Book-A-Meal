import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import swal from 'sweetalert';

import TableCol from './TableCol';

const TableRow = (props) => {
  const { item, sn, deleteRow } = props;

  const changePortion = (portion) => {
    props.updateCartMealPortion({ ...item, portion });
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
              {...props}
            />)
        ))
      }

      <td data-title="delete">
        <button
          className="btn-col btn-1 del-btn"
          onClick={(e) => {
            e.preventDefault();
            swal({
              text: 'Are you sure you want to remove this meal?',
              buttons: true,
              dangerMode: true,
            })
              .then((confirmed) => {
                if (confirmed) {
                  deleteRow(item);
                }
              })
              .catch(err => err);
          }}
        >
          <FontAwesome
            name="trash"
            size="2x"
          />
        </button>
      </td>
    </tr>
  );
};

TableRow.propTypes = {
  item: PropTypes.object.isRequired,
  sn: PropTypes.number.isRequired,
  deleteRow: PropTypes.func.isRequired,
  updateCartMealPortion: PropTypes.func.isRequired
};


const mapStateToProps = state => ({
  cart: state.cart.meals
});

export default connect(mapStateToProps)(TableRow);
