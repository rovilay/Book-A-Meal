import React from 'react';
import PropTypes from 'prop-types';

const EditTableCol = (props) => {
  const {
    isEdit,
    val,
    dataTitle,
    mealId,
    updatePortion,
  } = props;

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
            onChange={(e) => {
              const portion = e.target.value;
              updatePortion(mealId, portion);
            }}
            required
          />
        )
        :
        (val)
      }
    </td>
  );
};

EditTableCol.defaultProps = {
  updatePortion: undefined
};

EditTableCol.propTypes = {
  dataTitle: PropTypes.string.isRequired,
  val: PropTypes.any.isRequired,
  isEdit: PropTypes.bool.isRequired,
  mealId: PropTypes.any.isRequired,
  updatePortion: PropTypes.func
};

export default EditTableCol;
