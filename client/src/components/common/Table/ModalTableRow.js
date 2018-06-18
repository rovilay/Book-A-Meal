import React from 'react';
import PropTypes from 'prop-types';

import EditTableCol from './EditCol';

const ModalTableRow = (props) => {
  const {
    item,
    isEdit,
    id,
    deleteRow
  } = props;

  return (
    <tr key={id}>
      {
        Object.keys(item).map((key, i) => (
          (
            <EditTableCol
              dataTitle={key}
              val={item[key]}
              key={i}
              isEdit={isEdit}
              mealId={id}
              {...props}
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
            onClick={() => {
              // if (confirm('Are you sure you want to delete?')) {
              //   deleteRow(id);
              // }
              deleteRow(id);
            }}
          >
            delete
          </button>
        </td>
      }
    </tr>
  );
};

ModalTableRow.defaultProps = {
  isEdit: false,
  deleteRow: undefined
};

ModalTableRow.propTypes = {
  item: PropTypes.object.isRequired,
  isEdit: PropTypes.bool,
  id: PropTypes.any.isRequired,
  deleteRow: PropTypes.func,
};

export default ModalTableRow;
