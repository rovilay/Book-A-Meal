import React from 'react';
import PropTypes from 'prop-types';

const LoginForm = props => (
  <div className="card">
    <div id="form-card" className="card-body" >
      <div className="login-form-title" id="login-form-title">
        User Login
        <hr />
      </div>
      <form
        id="login"
        className="login-form"
        onSubmit={(e) => {
          props.logUserIn(e);
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
              props.onChange(e);
            }}
            required
          />
        </p>

        {/* <p>
          <input type="checkbox" name="remember" id="remember" /> Remember me.
        </p> */}

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

LoginForm.propTypes = {
  password: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  logUserIn: PropTypes.func.isRequired
};

export default LoginForm;
