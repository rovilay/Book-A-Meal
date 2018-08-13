/* eslint jsx-a11y/label-has-for: 0 */
import React from 'react';
import PropTypes from 'prop-types';

const LoginForm = props => (
  <div id="form-card" className="form-card">
    <div className="login-form-title" id="login-form-title">
      User Login
    </div>
    <hr />
    <form
      id="login"
      className="login-form"
      onSubmit={(e) => {
        e.preventDefault();
        props.logUserIn();
      }}
    >
      <p>
        <label htmlFor="email">Email
          <span className="asterik">*</span>
        </label>
        <input
          type="email"
          id="login-email"
          placeholder="Enter Email"
          name="email"
          value={props.email}
          onChange={(e) => {
            e.preventDefault();
            props.onChange(e);
          }}
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
          value={props.password}
          onChange={(e) => {
            e.preventDefault();
            props.onChange(e);
          }}
          required
        />
      </p>

      <p>
        <button
          type="submit"
          id="loginbtn"
          className="loginbtn btn-2"
        >
          Login
        </button>
      </p>
    </form>
  </div>

);

LoginForm.propTypes = {
  password: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  logUserIn: PropTypes.func.isRequired
};

export default LoginForm;
