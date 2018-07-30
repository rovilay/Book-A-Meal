import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import setSuccessfulSignUpMsg from '../../actions/signupActions';
import sigupValidator from '../../helpers/signupValidator';
import serverReq from '../../helpers/serverReq';
import SignUpForm from './Signupform';

class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      cpassword: '',
      address: '',
      address2: '',
      Phone: '',
      Phone2: '',
      city: '',
      state: '',
      admin: '',
      isValid: false,
      redirect: false,
      response: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value.trim() });
    this.setState({ isValid: sigupValidator({ ...this.state }) });
  }

  /**
   * Checks and sends form value to sever using axios
   * @param {*} e Form submit event
   */
  async onSubmit(e) {
    e.preventDefault();
    if (this.state.role === '') {
      const err = { success: false, message: 'A role must be choosen!' };
      return this.setState({ response: { ...err } });
    }
    const response = await serverReq('post', '/api/v1/auth/signup', this.state);
    const {
      success,
      message
    } = response.data;

    if (success) {
      this.setState({
        isValid: false,
        redirect: true,
        response: { success, message },
      });
      this.props.setSuccessfulSignUpMsg(this.state.response.message);
    } else {
      this.setState({ response: { success, message } });
    }
  }

  render() {
    return (
      <section className="signuppage">
        <div className="signupform-container">
          <SignUpForm
            formValues={this.state}
            submit={this.onSubmit}
            change={this.onChange}
            checkError={this.checkError}
          />
        </div>
      </section>
    );
  }
}

SignUpPage.propTypes = {
  setSuccessfulSignUpMsg: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    setSuccessfulSignUpMsg
  },
  dispatch
);

export default connect('', mapDispatchToProps)(SignUpPage);
