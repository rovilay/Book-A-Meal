/* eslint jsx-a11y/label-has-for:0 */

import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: '',
      lname: '',
      email: '',
      password: '',
      cpassword: '',
      address: '',
      address2: '',
      phone: '',
      phone2: '',
      city: '',
      state: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    // this.changeTitle = this.changeTitle.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    console.log(this.state);
  }


  changeTitle() {
    const checkbox = document.querySelector('#admin-checkbox');
    if (checkbox.checked) {
      this.setState({ title: 'Admin Login' });
    }
  }

  render() {
    return (
      <div className="signup-card">
        <div className="form-title" id="signup-form-title">
          SignUp Form
          <hr />
        </div>
        <form id="signup" className="signup-form" onSubmit={this.onSubmit} >
          <p>
            <label htmlFor="fname">
              First name
              <span className="asterik">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter first name"
              name="fname"
              id="signup-fname"
              value={this.state.fname}
              onChange={this.onChange}
              required
            />
          </p>

          <p>
            <label htmlFor="lname">Last name
              <span className="asterik">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter last name"
              name="lname"
              id="signup-lname"
              value={this.state.lname}
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
            <label htmlFor="phone">
              Phone
              <span className="asterik">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter phone number"
              name="phone"
              id="signup-phone"
              value={this.state.phone}
              onChange={this.onChange}
              required
            />
          </p>

          <p>
            <label htmlFor="phone2">
              Phone 2
            </label>
            <input
              type="text"
              id="signup-phone2"
              placeholder="Enter phone number"
              name="phone2"
              value={this.state.phone2}
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
    );
  }
}

// SignUpForm.propTypes = {
//   title: PropTypes.string.isRequired
// };

export default SignUpForm;
