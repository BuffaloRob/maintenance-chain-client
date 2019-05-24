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
import { fetchCategories } from '../actions/categoryActions'
import { fetchLogs } from '../actions/logActions'
import { selectItem, selectCategory, selectLog } from '../actions/selectActions';

class App extends React.Component {

  componentDidMount() {
    this.props.fetchItems();
  }

  selectItem = (itemId) => {
    const item = this.props.items[itemId]
    this.props.selectItem(item)
  }

  selectCategory = (catId, itemId) => {
    // can I use fetchCategory instead?
    
    //need to make fetchCategories async call
    this.props.fetchCategories(parseInt(itemId))

    const cat = this.props.categories[catId]
    this.props.selectCategory(cat, itemId)
  }

  selectLog = (logId, itemId, categoryId) => {
    
    //need to make fetchLogs async
    this.props.fetchLogs(categoryId, itemId)
    const log = this.props.logs[logId]
    this.props.selectLog(log, itemId)
  }

  render() {
    return (
      <div className="ui container">
        <Router history={history}>
          <>
            <Header />
            {/* <Switch> */}

              <Route exact path='/log/:id' render={props => <LogShow {...props} log={this.props.selectedLog} />} />

              <Route exact path='/item/:itemId/category/:id' render={props => <CategoryShow {...props} category={this.props.selectedCategory} selectLog={this.selectLog} />} />
  
              <Route exact path="/items" render={props => <ItemList {...props} items={Object.values(this.props.items)} selectItem={this.selectItem}/> } />
              <Route exact path="/item/new" component={ItemCreate} />
              <Route exact path="/item/edit/:id" component={ItemEdit} />
              <Route exact path="/item/delete/:id" component={ItemDelete} />
              <Route exact path="/item/:id" render={props => <ItemShow {...props} item={this.props.selectedItem} selectCategory={this.selectCategory} />} />

              <Route exact path="/" component={Home} />
              <Route path="/signup" component={SignUp} />
              <Route path="/login" component={Login} />
              <Route path='/pastdue' component={PastDue} />
            {/* </Switch> */}

          </>
        </Router>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    items: state.items,
    selectedItem: state.selectedItem,
    selectedCategory: state.selectedCategory,
    selectedLog: state.selectedLog,
    categories: state.categories,
    logs: state.logs,
  }
}

export default connect(mapStateToProps, { 
  selectItem, 
  selectCategory, 
  selectLog,
  fetchItems,
  fetchCategories,
  fetchLogs, 
})(App);