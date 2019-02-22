import React from 'react';
import { Router, Route } from 'react-router-dom';

import ItemList from './items/ItemList';
import Header from './Header';
import history from '../history';
import ItemCreate from './items/ItemCreate';
import ItemDelete from './items/ItemDelete';
import ItemEdit from './items/ItemEdit';
import ItemShow from './items/ItemShow';

import SignUp from './SignUp';

const App = () => {
  return <div className="ui container">
      <Router history={history}>
        <div>
          <Header />
          <Route exact path="/" component={ItemList} />
          <Route path="/items/new" exact component={ItemCreate} />
          <Route path="/items/:id" exact component={ItemShow} />
          <Route path="/items/delete/:id" exact component={ItemDelete} />
          <Route path="/items/edit/:id" exact component={ItemEdit} />
          <Route exact path="/signup" component={SignUp} />
        </div>
      </Router>
    </div>;
}

export default App;