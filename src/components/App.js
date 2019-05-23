import React from 'react';
import { connect } from 'react-redux';
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

import { fetchItems } from '../actions/itemActions';

class App extends React.Component {

  state = {selectedItem: null}

  componentDidMount() {
    this.props.fetchItems();
  }

  selectItem = (itemId) => {
    const item = this.props.items.find(item => item.id === itemId)
    this.setState({ selectedItem: item })
    // then use item to set selectedItem in state???
  }

  render() {
    return (
      <div className="ui container">
        <Router history={history}>
          <>
            <Header />
            <Switch>
    
              <Route exact path="/items" render={props => <ItemList {...props} items={Object.values(this.props.items)} selectItem={this.selectItem}/> } />

              <Route exact path="/items/:id" render={props => <ItemShow {...props} item={this.state.selectedItem}/> } />

              <Route exact path="/" component={Home} />
              <Route path="/signup" component={SignUp} />
              <Route path="/login" component={Login} />
              <Route path='/pastdue' component={PastDue} />
            </Switch>

          </>
        </Router>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    items: state.items,
  }
}

export default connect(mapStateToProps, { fetchItems })(App);