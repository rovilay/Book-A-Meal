/* eslint jsx-a11y/label-has-for:0 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classname from 'classnames';

class SignUpForm extends Component {
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
      response: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value.trim() });
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.state.password && this.state.cpassword !== this.state.password) {
      const err = { success: false, message: 'passwords do not match!' };
      return this.setState({ response: { ...err } });
    }
    this.props.signUpReq(this.state)
      .then((res) => {
        const { data } = res;
        this.setState({
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
          response: { ...data }
        });
      })
      .catch((err) => {
        const { data } = err.response;
        return this.setState({ response: { ...data } });
      });
  }

  render() {
    const { success, message } = this.state.response;
    return (
      <div>
        {
          (message && !message.includes('password'))
          &&
          <p
            id="alert"
            role="alert"
            className={classname('alert-danger', { 'alert-success': success })}
          >
            {message}
          </p>
        }
        <div className="signup-card">
          <div className="form-title" id="signup-form-title">
            SignUp Form
            <hr />
          </div>
          <form id="signup" className="signup-form" onSubmit={this.onSubmit} >
            <p>
              <label htmlFor="firstName">
                First name
                <span className="asterik">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter first name"
                name="firstName"
                id="signup-fname"
                value={this.state.firstName}
                onChange={this.onChange}
                required
              />
            </p>

            <p>
              <label htmlFor="lastName">Last name
                <span className="asterik">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter last name"
                name="lastName"
                id="signup-lname"
                value={this.state.lastName}
                onChange={this.onChange}
                required
              />
            </p>

            <p className="full">
              <label htmlFor="email">Email
                <span className="asterik">*</span>
              </label>
              <input
                type="email"
                placeholder="Enter email"
                id="signup-email"
                name="email"
                value={this.state.email}
                onChange={this.onChange}
                minLength="10"
                required
              />
            </p>

            <p>
              <label htmlFor="Phone">
                Phone
                <span className="asterik">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter phone number"
                name="Phone"
                id="signup-phone"
                value={this.state.Phone}
                onChange={this.onChange}
                required
              />
            </p>

            <p>
              <label htmlFor="Phone2">
                Phone 2
              </label>
              <input
                type="text"
                id="signup-phone2"
                placeholder="Enter phone number"
                name="Phone2"
                value={this.state.Phone2}
                onChange={this.onChange}
              />
            </p>

            <p>
              <label htmlFor="address">
                Address
                <span className="asterik">*</span>
              </label>
              <input
                type="text"
                id="signup-address"
                placeholder="Enter permanent address"
                name="address"
                value={this.state.address}
                onChange={this.onChange}
                required
              />
            </p>

            <p>
              <label htmlFor="address2">
                Address 2
              </label>
              <input
                type="text"
                id="signup-address2"
                placeholder="Enter address"
                name="address2"
                value={this.state.address2}
                onChange={this.onChange}
              />
            </p>

            <p>
              <label htmlFor="city">
                City
                <span className="asterik">*</span>
              </label>
              <input
                type="text"
                id="signup-city"
                placeholder="Enter City"
                name="city"
                value={this.state.city}
                onChange={this.onChange}
                required
              />
            </p>

            <p>
              <label htmlFor="state">
                State
                <span className="asterik">*</span>
              </label>
              <input
                type="text"
                id="signup-state"
                placeholder="Enter State"
                name="state"
                value={this.state.state}
                onChange={this.onChange}
                required
              />
            </p>

            <p>
              <label htmlFor="password">
                Password
                <span className="asterik">*</span>
              </label>
              <input
                type="password"
                id="signup-psw"
                placeholder="Enter Password"
                name="password"
                value={this.state.password}
                onChange={this.onChange}
                required
              />
              {
                (message && message.includes('password'))
                &&
                <span
                  id="alert"
                  role="alert"
                  className="alert-danger"
                >
                  {message}
                </span>
              }
            </p>

            <p>
              <label htmlFor="cpassword">
                Confirm Password
                <span className="asterik">*</span>
              </label>
              <input
                type="password"
                id="signup-cpsw"
                placeholder="Confirm Password"
                name="cpassword"
                value={this.state.cpassword}
                onChange={this.onChange}
                required
              />
              {
                (message && message.includes('password'))
                &&
                <span
                  id="alert"
                  role="alert"
                  className="alert-danger"
                >
                  {message}
                </span>
              }
            </p>

            <p className="full">
              By creating an account you agree to our
              <Link to="#">Terms & Policy</Link> .
            </p>

            <p className="full">
              <button type="submit" name="signupbtn" id="signupbtn" className="signupbtn btn-1">Sign Up</button>
            </p>
          </form>
        </div>
        {
          (message && !message.includes('password'))
          &&
          <p
            id="alert"
            role="alert"
            className={classname('alert-danger', { 'alert-success': success })}
          >
            {message}
          </p>
        }
      </div>
    );
  }
}

SignUpForm.propTypes = {
  signUpReq: PropTypes.func.isRequired
};

export default SignUpForm;
