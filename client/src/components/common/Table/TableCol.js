import React from 'react';
import PropTypes from 'prop-types';
import classname from 'classnames';

const TableCol = props => (
  <td data-title={props.dataTitle} className={classname('', { 'meal-Image': props.dataTitle === 'meal' })}>
    {props.val}
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
  mealImage: undefined
};

TableCol.propTypes = {
  dataTitle: PropTypes.string.isRequired,
  val: PropTypes.any.isRequired,
  mealImage: PropTypes.string
};

export default TableCol;
