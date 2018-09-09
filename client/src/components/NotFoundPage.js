import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setNav } from '../actions/navLinksActions';

export class NotFoundPage extends Component {
  componentDidMount() {
    this.props.setNav([]);
  }

  render() {
    return (
      <div className="not-found-page-container">
        <div className="not-found-page">
          <h1>404!</h1>
          You seem Lost!
          Click <Link to="/">here</Link> to go home.
        </div>
      </div>
    );
  }
}

NotFoundPage.propTypes = {
  setNav: PropTypes.func.isRequired
};

export default connect('', { setNav })(NotFoundPage);
