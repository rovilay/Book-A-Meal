import React from 'react';
import PropTypes from 'prop-types';

import TableCol from './EditCol';
import { deleteMealInEditOrder } from '../../../actions/orders';

const ModalTableRow = (props) => {
  const {
    item,
    isEdit,
    id,
    dispatch
  } = props;

  const deleteRow = () => {
    // const id = sn - 1;
    dispatch(deleteMealInEditOrder(id));

    console.log('meal deleted');
  };

  return (
    <tr key={id}>
      {
        Object.keys(item).map((key, i) => (
          (
            <TableCol
              dataTitle={key}
              val={item[key]}
              key={i}
              isEdit={isEdit}
            />
          )
        ))
      }
      {
        (isEdit)
        &&
        <td data-title="delete">
          <button
            className="btn-col btn-1"
            onClick={deleteRow}
          >
            delete
          </button>
        </td>
      }
    </tr>
  );
};

ModalTableRow.defaultProps = {
  isEdit: false
};

ModalTableRow.propTypes = {
  item: PropTypes.object.isRequired,
  isEdit: PropTypes.bool,
  id: PropTypes.any.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default ModalTableRow;
