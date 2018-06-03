import React from 'react';
import PropTypes from 'prop-types';

const TableHead = props => (
  <thead>
    <tr>
      {
        props.tableHead.map((head, i) => (
          (head === 'id')
          ?
            <th key={i} >No</th>
          :
            <th key={i}>{head}</th>
        ))
      }
      {
        (props.price)
        &&
        <th>{props.price}</th>
      }
      <th>{props.lastColTitle}</th>
    </tr>
  </thead>
);

TableHead.propTypes = {
  tableHead: PropTypes.array.isRequired,
  lastColTitle: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired
};

export default TableHead;
