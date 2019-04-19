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

import LogList from './logs/LogList';
import LogCreate from './logs/LogCreate';
import LogDelete from './logs/LogDelete';
import LogEdit from './logs/LogEdit';
import LogShow from './logs/LogShow';

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
          <Route exact path="/logs/list" component={LogList} />
          <Route path="/logs/delete/:id" component={LogDelete} />
          <Route exact path="/logs/show" component={LogShow} />
          <Route path="/logs/create" component={LogCreate} />
          <Route path="/logs/edit/:id" component={LogEdit} />
        </div>
      </Router>
    </div>;
}

export default App;