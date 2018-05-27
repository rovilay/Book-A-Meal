import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import Showcase from './Showcase';
import Welcome from './Wlcdesc';
import Menu from '../common/Menu';
import Footer from '../common/Footer';

class IndexPage extends Component {
  render() {
    return (
      <div className="main-container">
        <Showcase />
        <Welcome />
        <Menu />
        <Footer />
      </div>
    );
  }
}

export default IndexPage;
