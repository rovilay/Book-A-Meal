import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import axios from 'axios';
import signUpReq from '../../actions/signupactions';
import '../../assests/css/signup.css';
import Form from './form';
import Footer from '../common/Footer';


class SignUpPage extends Component {
  render() {
    return (
      <div className="main-container">
        <section id="signup-section" className="grid">
          <div className="signup-container">
            <Form signUpReq={signUpReq} />
            <p>
              <Link to="/Login">Click Here! to Log in </Link>
            </p>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}

// SignUpPage.propTypes = {
//   signUpReq: PropTypes.func.isRequired
// };

// export default connect(null, { signUpReq })(SignUpPage);
export default SignUpPage;

