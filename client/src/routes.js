import React from 'react';
import { Route, IndexRoute } from 'react-router-dom';

import App from './components/App';
import HomePage from './components/homepage/Index';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
  </Route>
);
