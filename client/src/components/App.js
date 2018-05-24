import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Header from '../components/common/header';
import TableRow from '../components/common/tablerow';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          id: 1,
          name: 'akinola'
        },

        {
          id: 2,
          name: 'ogooluwa'
        },

        {
          id: 3,
          name: 'akinrinade'
        }
      ]
    };
  }
  render() {
    return (
      <div>
        <Header />
        <h1>My React App!</h1>
        <table>
          <tbody>
            {this.state.data.map((person, i) => <TableRow key = {i} data = {person} />)}
          </tbody>
        </table>
      </div>
    );
  }
}

// App.propTypes =  {
//   person: PropTypes.object
// }

export default App;

