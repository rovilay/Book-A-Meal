/* eslint class-methods-use-this:0 */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import setSuccessfulSignUpMsg from '../../actions/signupActions';
import { loginUser } from '../../actions/loginActions';
import LoginForm from './Loginform';

class LogInPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };

    this.logUserIn = this.logUserIn.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    setTimeout(
      () => {
        if (this.props.signUpSuccess.message) {
          this.notify(this.props.signUpSuccess.message);
          setTimeout(
            () => {
              this.props.setSuccessfulSignUpMsg('');
            },
            5000
          );
        }
      },
      200
    );
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value.trim() });
  }

  /**
   * Logs user in on submit
   * @param {Object} e DOM event
   */
  logUserIn() {
    this.props.loginUser({ ...this.state });
  }

  render() {
    return (
      <section id="loginpage" className="loginpage">
        <div className="loginform-container">
          <LoginForm
            {...this.props}
            logUserIn={this.logUserIn}
            onChange={this.onChange}
            password={this.state.password}
            email={this.state.email}
          />

          <p className="link">
            <Link to="/SignUp">
              Click Here to SignUp!
            </Link>
          </p>
        </div>
      </section>
    );
  }
}

LogInPage.propTypes = {
  signUpSuccess: PropTypes.object.isRequired,
  setSuccessfulSignUpMsg: PropTypes.func.isRequired,
  loginUser: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  signUpSuccess: state.signUp.signUpSuccess,
  user: state.login.user
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    setSuccessfulSignUpMsg,
    loginUser
  },
  dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(LogInPage);
