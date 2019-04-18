import React from 'react';
import { Router, Route } from 'react-router-dom';

import Header from './Header';
import history from '../history';

import ItemList from './items/ItemList';
import ItemCreate from './items/ItemCreate';
import ItemDelete from './items/ItemDelete';
import ItemEdit from './items/ItemEdit';
import ItemShow from './items/ItemShow';

import SignUp from './SignUp';
import Login from './Login';

import CategoryCreate from './categories/CategoryCreate';
import CategoryDelete from './categories/CategoryDelete';
import CategoryEdit from './categories/CategoryEdit';
import CategoryShow from './categories/CategoryShow';
import CategoryList from './categories/CategoryList';

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
          <Route path="/categories/list" component={CategoryList} />
          <Route path="/categories/delete/:id" component={CategoryDelete} />
          <Route exact path="/categories/show" component={CategoryShow} />
          <Route path="/categories/new" component={CategoryCreate} />
          <Route path="/categories/edit/:id" component={CategoryEdit} />
        </div>
      </Router>
    </div>;
}

export default App;