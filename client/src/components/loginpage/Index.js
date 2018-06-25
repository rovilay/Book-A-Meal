/* eslint class-methods-use-this:0 */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import setSuccessfulSignUpMsg from '../../actions/signup';
import { loginUser } from '../../actions/login';
import Form from './form';

class LogInPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };

    this.logUserIn = this.logUserIn.bind(this);
    this.onChange = this.onChange.bind(this);
    this.notify = this.notify.bind(this);
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

  notify(msg) {
    toast(msg, {
      position: toast.POSITION.TOP_CENTER,
      className: 'toast',
      progressClassName: 'toast-progress'
    });
  }

  /**
   * Logs user in on submit
   * @param {Object} e DOM event
   */
  logUserIn(e) {
    e.preventDefault();
    this.props.loginUser({ ...this.state });
    if (this.props.user.isLogin) {
      this.props.history.push('/dashboard');
    }
    setTimeout(() => {
      if (this.props.user.isLogin) {
        this.props.history.push('/dashboard');
      } else if (!this.props.user.isLogin) {
        setTimeout(this.notify(this.props.user.loginMessage), 200);
      }
    }, 500);
  }

  render() {
    return (
      <div className="pull-down">
        <section id="section-a" className="grid">
          <div className="login-form-container">
            <p className="link">
              <Link to="/SignUp">
                Click Here to SignUp!
              </Link>
            </p>

            <Form
              {...this.props}
              logUserIn={this.logUserIn}
              onChange={this.onChange}
              password={this.state.password}
              email={this.state.email}
            />
          </div>
        </section>
        <ToastContainer />
      </div>
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
