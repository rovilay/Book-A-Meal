import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { signUp } from '../../actions/signupActions';
import sigupValidator from '../../helpers/signupValidator';
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
      response: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    this.setState({ isValid: sigupValidator({ ...this.state }) });
  }

  /**
   * Checks and sends form value to sever using axios
   * @param {*} e Form submit event
   */
  onSubmit(e) {
    e.preventDefault();
    if (this.state.role === '') {
      const err = { success: false, message: 'A role must be choosen!' };
      return this.setState({ response: { ...err } });
    }
    const response = this.props.signUp(this.state);
    const {
      success,
      message
    } = response;

    if (success) {
      this.setState({
        isValid: false,
        response: { success, message },
      });
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
  signUp: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    signUp
  },
  dispatch
);

export default connect('', mapDispatchToProps)(SignUpPage);
