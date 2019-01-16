import React from 'react';
import { Router, Route } from 'react-router-dom';

import ItemList from './items/ItemList';
import Header from './Header';
import history from '../history';

const App = () => {
  return (
    <Router history={history}>
      <div>
        <Header />
        <Route path='/' exact component={ItemList} />
      </div>
    </Router>
  )
}

export default App;