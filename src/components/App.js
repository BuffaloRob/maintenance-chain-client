import React from 'react';
import { Router, Route } from 'react-router-dom';

import Header from './Header';
import history from '../history';

const App = () => {
  return (
    <Router history={history}>
      <div>
        <Header />
      </div>
    </Router>
  )
}

export default App;