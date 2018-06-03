import React from 'react';
import PropTypes from 'prop-types';

const TableCol = props => (
  <td data-title={props.dataTitle}>
    {props.val}
  </td>
);

TableCol.propTypes = {
  dataTitle: PropTypes.string.isRequired,
  val: PropTypes.any.isRequired
};

export default TableCol;
