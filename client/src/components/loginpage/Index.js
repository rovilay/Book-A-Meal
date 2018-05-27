import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import { Route } from 'react-router-dom';

import '../../assests/css/login.css';
import Form from './form';
import Footer from '../common/Footer';
import CheckBox from './admincheck';


class LogInPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Cusmtomer Login'
    };

    // this.checkbox = document.getElementById('admin-checkbox');
    // if (this.checkbox.checked) {
    //   this.setState({ title: 'Admin Login' });
    // }
  }

  render() {
    return (
      <div className="main-container">
        <section id="section-a" className="grid">
          <div className="login-form-container">
            {/* <div id="alert" role="alert"></div> */}

            <CheckBox />

            <p>
              <Link to="/SignUp">
              Click Here to SignUp!
              </Link>
            </p>

            <Form title={this.state.title} />
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}

export default LogInPage;
