import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import axios from 'axios';
import postReq from '../../helpers/serverReq';
import '../../assests/css/signup.css';
import Form from './form';
import Footer from '../common/Footer';


const SignUpPage = props => (
  <div className="main-container">
    <section id="signup-section" className="grid">
      <div className="signup-container">
        <Form signUpReq={props.postReq} />
        <p>
          <Link to="/Login">Click Here! to Log in </Link>
        </p>
      </div>
    </section>
    <Footer />
  </div>
);

SignUpPage.propTypes = {
  postReq: PropTypes.func.isRequired
};

export default connect(null, { postReq })(SignUpPage);

