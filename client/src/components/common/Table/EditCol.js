import React from 'react';
import PropTypes from 'prop-types';

const EditTableCol = (props) => {
  const { isEdit, val, dataTitle } = props;

  return (
    <td data-title={dataTitle}>

      {
        (isEdit && dataTitle === 'portion')
        ?
        (
          <input
            type="number"
            min="1"
            id="portion"
            className="portion"
            name="portion"
            defaultValue={val}
            // onChange={this.onChange}
            required
          />
        )
        :
        (val)
      }
    </td>
  );
};

EditTableCol.propTypes = {
  dataTitle: PropTypes.string.isRequired,
  val: PropTypes.any.isRequired,
  isEdit: PropTypes.bool.isRequired
};

export default EditTableCol;
