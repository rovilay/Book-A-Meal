import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="not-found-page-container">
    <div className="not-found-page">
      <h1>404!</h1>
      You seem Lost!
      Click <Link to="/">here</Link> to go home.
    </div>
  </div>
);

export default NotFound;
