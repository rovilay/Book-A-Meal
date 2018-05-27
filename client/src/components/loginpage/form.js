import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FormTitle from './formtitle';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      title: 'Customer Login'
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.changeTitle = this.changeTitle.bind(this);
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
      <div className="card">
        <div id="form-card" className="card-body" >
          <FormTitle title={this.props.title} />

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
            </p>

            <p>
              <input type="checkbox" name="remember" id="remember" /> Remember me.
            </p>

            <p>
              <button type="submit" id="loginbtn" className="loginbtn btn-1">Login</button>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

LoginForm.propTypes = {
  title: PropTypes.string.isRequired
};

export default LoginForm;
