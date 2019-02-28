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
import Login from './Login';

const App = () => {
  return <div className="ui container">
      <Router history={history}>
        <div>
          <Header />
          <Route exact path="/" component={ItemList} />
          <Route path="/items/delete/:id" component={ItemDelete} />
          <Route exact path="/items/show" component={ItemShow} />
          <Route path="/items/new" component={ItemCreate} />
          <Route path="/items/edit/:id" component={ItemEdit} />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
        </div>
      </Router>
    </div>;
}

export default App;