import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import swal from 'sweetalert';

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
        <td data-title="delete" className="delete">
          <button
            className="btn-col btn-2 danger"
            onClick={(e) => {
              e.preventDefault();
              swal({
                text: 'Are you sure you want to remove this meal?',
                buttons: true,
                dangerMode: true,
              })
                .then((confirmed) => {
                  if (confirmed) {
                    deleteRow(id);
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
      }
      {
        (isEdit)
        &&
        <td data-title="delete" className="mob-delete">
          <button
            className="btn-2 danger"
            onClick={() => {
              deleteRow(id);
            }}
          >
            <FontAwesome
              name="trash"
              size="2x"
            />
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
