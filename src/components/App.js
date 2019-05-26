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
import { itemSelector, categorySelector, logSelector } from '../actions/selectActions';

class App extends React.Component {

  componentDidMount() {
    this.props.fetchItems();
  }

  selectItem = (itemId) => {
    console.log(`item id: ${itemId}`)
    const item = this.props.items[itemId]
    this.props.itemSelector(item)
    history.push(`/item/${item.id}`)
  }

  selectCategory = async (catId, itemId) => {
    await this.props.fetchCategories(itemId)
    const cat = this.props.categories[catId]
    this.props.categorySelector(cat, itemId)
    history.push(`/item/${itemId}/category/${cat.id}`)
  }

  selectLog = async (logId, itemId, categoryId) => {
    await this.props.fetchLogs(categoryId, itemId)
    const log = this.props.logs[logId]
    this.props.logSelector(log, itemId)
    history.push(`/log/${log.id}`)
  }

  editCategoryClick = async (catId, itemId) => {
    await this.props.fetchCategories(itemId)
    const cat = this.props.categories[catId]
    this.props.categorySelector(cat, itemId)
    history.push(`/item/${itemId}/category/${catId}/edit`)
  }

  // editItemClick = (item) => {
  //   this.props.selectItem(item)
  //   history.push(`/item/${item.id}/edit`)
  // }

  render() {
    return (
      <div className="ui container">
        <Router history={history}>
          <>
            <Header />
            <Switch>

              <Route exact path='/log/:id' render={props => 
                <LogShow {...props} 
                  log={this.props.selectedLog} 
                />} 
              />
               
              <Route exact path='/item/:itemId/category/new' component={CategoryCreate} />
              <Route exact path='/item/:itemId/category/:id' render={props =>
                <CategoryShow {...props} 
                  category={this.props.selectedCategory} 
                  selectLog={this.selectLog} 
                />} 
              />
              {/* <Route exact path='/item/:itemId/category/:id/edit' component={CategoryEdit} /> */}
              <Route exact path='/item/:itemId/category/:id/edit' render={props =>
                <CategoryEdit {...props}
                  category={this.props.selectedCategory}
                />}
              />
              <Route exact path='/item/:itemId/category/:id/delete' component={CategoryDelete} /> 

              <Route exact path="/items" render={props => 
                <ItemList {...props} 
                  items={Object.values(this.props.items)} 
                  selectItem={this.selectItem}
                  editItemClick={this.editItemClick}
                />} 
              />
              <Route exact path="/item/new" component={ItemCreate} />
              <Route exact path="/item/:id/edit" component={ItemEdit} />
              <Route exact path="/item/:id/delete" component={ItemDelete} />
              <Route exact path="/item/:id" render={props => 
                <ItemShow {...props} 
                  item={this.props.selectedItem} 
                  selectCategory={this.selectCategory} 
                  editCategoryClick={this.editCategoryClick}
                />} 
              />

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

const mapStateToProps = state => {
  return {
    items: state.items,
    categories: state.categories,
    logs: state.logs,
    selectedItem: state.selectedItem,
    selectedCategory: state.selectedCategory,
    selectedLog: state.selectedLog,
  }
}

export default connect(mapStateToProps, { 
  itemSelector, 
  categorySelector, 
  logSelector,
  fetchItems,
  fetchCategories,
  fetchLogs, 
})(App);