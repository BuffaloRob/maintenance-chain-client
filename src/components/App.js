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
// import LogDelete from './logs/LogDelete';
// import LogEdit from './logs/LogEdit';
import LogShow from './logs/LogShow';

const App = () => {
  return <div className="ui container">
      <Router history={history}>
        <>
          <Header />
          <Switch>
            <Route exact path="/items/:itemId/categories/:id/logs/new" component={LogCreate} />
            <Route path="/logs/:id" component={LogShow} />
            {/* <Route path="items/:itemId/categories/:catId/logs/delete/:id" component={LogDelete} /> */}
            {/* <Route path="items/:itemId/categories/:catId/logs/edit/:id" component={LogEdit} />    */}
            
            <Route exact path="/items/:id/categories/new" component={CategoryCreate} />
            <Route exact path="/items/:itemId/categories/:id" component={CategoryShow} />
            <Route path="/items/:itemId/categories/delete/:id" component={CategoryDelete} />
            <Route path="/items/:itemId/categories/edit/:id" component={CategoryEdit} />

            <Route exact path="/items" component={ItemList} />
            <Route path="/items/new" component={ItemCreate} />
            <Route path="/items/delete/:id" component={ItemDelete} />
            <Route path="/items/edit/:id" component={ItemEdit} />
            <Route exact path="/items/:id" component={ItemShow} />

            <Route exact path="/" component={Home} />
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={Login} />  
          </Switch>
         
        </>
      </Router>
    </div>;
}

export default App;