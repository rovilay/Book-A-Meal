import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../../assests/css/style.css';
import Footer from '../common/Footer';
import Header from '../common/Header';
import Showcase from './Showcase';
import Welcome from './Wlcdesc';

class IndexPage extends Component {
  render() {
    return (
      <div className="main-container">
        <Header navData={this.props.nav} />
        {/* <h1>Book-A-Meal</h1> */}
        <Showcase />
        <Welcome navData={this.props.nav} />
        <Footer />
      </div>
    );
  }
}

IndexPage.propTypes = {
  nav: PropTypes.array
};

IndexPage.defaultProps = {
  nav: [
    {
      title: 'Sign in',
      link: 'login.html'
    },
    {
      title: 'Sign Up',
      link: 'signup.html'
    }
  ]
};

export default IndexPage;
