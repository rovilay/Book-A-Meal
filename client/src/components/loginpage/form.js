import React, { Component } from 'react';
import PropTypes from 'prop-types';
import jwt from 'jsonwebtoken';
// import axios from 'axios';

import serverReq from '../../helpers/serverReq';
import { storeInLs, delFromLs } from '../../helpers/Ls';
import setUserData from '../../actions/login';

// import validator from 'validator';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value.trim() });
  }

  async onSubmit(e) {
    e.preventDefault();
    const { dispatch } = this.props;
    const response = await serverReq('post', '/api/v1/auth/login', this.state);
    const {
      token,
      message,
      success,
    } = response.data;

    if (success) {
      storeInLs(token, 'jwt');
      const userData = jwt.decode(token).user;
      dispatch(setUserData({ message, success, ...userData }));
    } else {
      delFromLs('jwt');
      dispatch(setUserData({ message, success }));
    }
  }

  render() {
    return (
      <div className="card">
        <div id="form-card" className="card-body" >
          <div className="form-title" id="login-form-title">
            User Login
            <hr />
          </div>
          <form id="login" className="login-form" onSubmit={this.onSubmit}>
            <p>
              <label htmlFor="email">Email
                <span className="asterik">*</span>
              </label>
              <input
                type="email"
                id="login-email"
                placeholder="Enter Email"
                name="email"
                value={this.state.email}
                onChange={this.onChange}
                required
              />
            </p>

            <p>
              <label htmlFor="password">Password
                <span className="asterik">*</span>
              </label>
              <input
                type="password"
                id="login-password"
                placeholder="Enter password"
                name="password"
                value={this.state.password}
                onChange={this.onChange}
                required
              />
              {/* {
                (password !== undefined && !password)
                &&
                <span
                  id="alert"
                  role="alert"
                  className="alert-danger"
                >
                  password is invalid
                </span>
              } */}
            </p>

            <p>
              <input type="checkbox" name="remember" id="remember" /> Remember me.
            </p>

            <p>
              <button
                type="submit"
                id="loginbtn"
                className="loginbtn btn-1"
              >
                Login
              </button>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

LoginForm.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default LoginForm;
