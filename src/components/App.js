import React from 'react';
import { Router, Route } from 'react-router-dom';

import ItemList from './items/ItemList';
import Header from './Header';
import history from '../history';
import ItemCreate from './items/ItemCreate';

const App = () => {
  return <div className="ui container">
      <Router history={history}>
        <div>
          <Header />
          <Route path="/" exact component={ItemList} />
          <Route path="/items/new" exact component={ItemCreate} />
        </div>
      </Router>
    </div>;
}

export default App;