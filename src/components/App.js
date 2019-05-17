import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import Header from './Header';
import history from '../history';

import Home from './Home';

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

import LogCreate from './logs/LogCreate';
import LogDelete from './logs/LogDelete';
import LogEdit from './logs/LogEdit';
import LogShow from './logs/LogShow';

import PastDue from './PastDue';

const App = () => {
  return <div className="ui container">
      <Router history={history}>
        <>
          <Header />
          <Switch>
            <Route exact path="/items/:itemId/categories/:id/logs/new" component={LogCreate} />
            <Route exact path="/items/:itemId/logs/:id" component={LogShow} />
            <Route exact path="/items/:itemId/logs/delete/:id" component={LogDelete} />
            <Route exact path="/items/:itemId/logs/edit/:id" component={LogEdit} /> 

            <Route exact path="/items/:id/categories/new" component={CategoryCreate} />
            <Route exact path="/items/:itemId/categories/:id" component={CategoryShow} />
            <Route exact path="/items/:itemId/categories/delete/:id" component={CategoryDelete} />
            <Route exact path="/items/:itemId/categories/edit/:id" component={CategoryEdit} />

            <Route exact path="/items" component={ItemList} />
            <Route exact path="/items/new" component={ItemCreate} />
            <Route exact path="/items/delete/:id" component={ItemDelete} />
            <Route exact path="/items/edit/:id" component={ItemEdit} />
            <Route exact path="/items/:id" component={ItemShow} />

            <Route exact path="/" component={Home} />
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={Login} />  
            <Route path='/pastdue' component={PastDue} />
          </Switch>
         
        </>
      </Router>
    </div>;
}

export default App;