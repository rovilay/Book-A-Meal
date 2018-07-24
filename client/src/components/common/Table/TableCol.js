import React from 'react';
import PropTypes from 'prop-types';
import classname from 'classnames';

const TableCol = props => (
  <td data-title={props.dataTitle} className={classname('', { 'meal-Image': props.dataTitle === 'meal' })}>
    {
      props.dataTitle === 'portion'
        ?
          <input
            type="number"
            min="1"
            id={`portion-${props.itemId}`}
            className="portion"
            name="portion"
            onChange={() => {
              const portion = document.getElementById(`portion-${props.itemId}`).value;
              props.changePortion(portion);
            }}
            defaultValue = {props.val}
            required
          />
        :
        props.val
    }
    {
      (props.dataTitle === 'meal')
      &&
      (
        <span className="tooltip">
          <img src={props.mealImage} alt={props.val} />
        </span>
      )
    }
  </td>
);


TableCol.defaultProps = {
  mealImage: undefined,
  changePortion: undefined,
  itemId: undefined
};

TableCol.propTypes = {
  dataTitle: PropTypes.string.isRequired,
  val: PropTypes.any.isRequired,
  mealImage: PropTypes.string,
  itemId: PropTypes.string,
  changePortion: PropTypes.func
};

export default TableCol;
