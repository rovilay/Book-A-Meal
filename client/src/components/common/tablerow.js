import React, { Component } from 'react';
import propTypes from 'prop-types';

class TableRow extends Component {
  constructor(props) {
    super(props);
    this.props = { data: propTypes.object };
  }
  render() {
    return (
      <tr>
        <td>{this.props.data.id}</td>
        <td>{this.props.data.name}</td>
      </tr>
    );
  }
}

export default TableRow;
