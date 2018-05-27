import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

import './../assests/scss/style.scss';
import Header from './common/Header';
import HomePage from './homepage/Index';
import SignUpPage from './signuppage/Index';
import LogInPage from './loginpage/Index';


class App extends Component {
  render() {
    return (
      <div>
        <Header navData={this.props.nav} />

        <Route path="/" exact component={HomePage} />
        {/* <IndexRoute component={IndexPage} /> */}
        <Route path="/SignUp" component={SignUpPage} />
        <Route path="/Login" component={LogInPage} />

      </div>
    );
  }
}

App.propTypes = {
  nav: PropTypes.array
};

App.defaultProps = {
  nav: [
    {
      title: 'Log In',
      link: '/Login'
    },
    {
      title: 'Sign Up',
      link: '/SignUp'
    }
  ]
};

export default App;

