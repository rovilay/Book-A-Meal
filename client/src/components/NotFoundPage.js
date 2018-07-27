import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="main-container">
    <div className="setmenu-container">
      <div className="notFoundCard">
        <h1>404!</h1>
        You seem Lost!
        Click <Link to="/">here</Link> to go home
      </div>
    </div>
  </div>
);

export default NotFound;
