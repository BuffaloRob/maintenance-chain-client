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
import CategoryList from './categories/CategoryList';

// import LogList from './logs/LogList';
import LogCreate from './logs/LogCreate';
// import LogDelete from './logs/LogDelete';
// import LogEdit from './logs/LogEdit';
// import LogShow from './logs/LogShow';

const App = () => {
  return <div className="ui container">
      <Router history={history}>
        <>
          <Header />
          <Switch>
            <Route path="/items/:itemId/categories/:id/logs/new" component={LogCreate} />
            {/* <Route exact path="/logs/list" component={LogList} /> */}
            {/* <Route path="/logs/delete/:id" component={LogDelete} /> */}
            {/* <Route path="/logs/edit/:id" component={LogEdit} />    */}
            {/* <Route exact path="/logs/:id" component={LogShow} /> */}

            <Route exact path="/items/:id/categories/new" component={CategoryCreate} />
            <Route exact path="/items/:id/categories/list" component={CategoryList} />
            <Route path="/items/:itemId/categories/delete/:id" component={CategoryDelete} />
            <Route path="/items/:itemId/categories/edit/:id" component={CategoryEdit} />
            <Route path="/items/:itemId/categories/:id" component={CategoryShow} />
            
            <Route exact path="/" component={Home} />
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={Login} />

            <Route exact path="/items" component={ItemList} />
            <Route exact path="/items/new" component={ItemCreate} />
            <Route path="/items/delete/:id" component={ItemDelete} />
            <Route path="/items/edit/:id" component={ItemEdit} />
            <Route path="/items/:id" component={ItemShow} />
            
          </Switch>
         
        </>
      </Router>
    </div>;
}

export default App;