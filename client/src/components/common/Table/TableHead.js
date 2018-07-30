import React from 'react';
import PropTypes from 'prop-types';

const TableHead = props => (
  <thead>
    <tr>
      {
        props.tableHeadData.map((title, i) => (<th key={i}>{title}</th>))
      }
    </tr>
  </thead>
);

TableHead.propTypes = {
  tableHeadData: PropTypes.array.isRequired,
};

export default TableHead;
