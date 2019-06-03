import React from "react";
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';

import history from '../history';

import ItemList from './items/ItemList';
import ItemCreate from './items/ItemCreate';
import ItemEdit from './items/ItemEdit';

import CategoryCreate from './categories/CategoryCreate';
import CategoryEdit from './categories/CategoryEdit';
import CategoryList from './categories/CategoryList';

import LogCreate from './logs/LogCreate';
import LogEdit from './logs/LogEdit';
import LogShow from './logs/LogShow';
import LogList from './logs/LogList';


import { fetchItems, deleteItem } from '../actions/itemActions';
import { deleteCategory } from '../actions/categoryActions'
import { deleteLog } from '../actions/logActions'
import { itemSelector, categorySelector, logSelector } from '../actions/selectActions';

class MaintenanceContainer extends React.Component {
  componentDidMount() {
    this.props.fetchItems();
    console.log('fetchItems called in MC')
  }

  selectItem = (itemId) => {
    console.log(`MaintenanceContainer item id: ${itemId} `)
    const item = this.props.items[itemId]
    this.props.itemSelector(item)
    history.push(`/item/${item.id}`)
  }

  selectCategory = (catId, itemId) => {
    const item = this.props.selectedItem
    const cat = item.categories.filter(cat => (cat.id === catId))
    this.props.categorySelector(cat, itemId)
    history.push(`/item/${itemId}/category/${catId}`)
  }

  selectLog = (logId, itemId, categoryId) => {
    const item = this.props.selectedItem
    const log = item.logs.filter(log => (log.id === logId))
    this.props.logSelector(log, itemId)
    history.push(`/log/${logId}`)
  }

  editCategoryClick = (catId, itemId) => {
    const item = this.props.selectedItem
    const cat = item.categories.filter(cat => (cat.id === catId))
    this.props.categorySelector(cat, itemId)
    history.push(`/item/${itemId}/category/${catId}/edit`)
  }

  editLogClick = (logId, itemId) => {
    const item = this.props.selectedItem
    const log = item.logs.filter(log => (log.id === logId))
    this.props.logSelector(log)
    history.push(`/item/${itemId}/log/${logId}/edit`)
  }

  deleteItemClick = itemId => {
    this.props.deleteItem(itemId)
  }

  deleteCategoryClick = (catId, itemId) => {
    this.props.deleteCategory(catId, itemId)
  }

  deleteLogClick = (logId, itemId) => {
    this.props.deleteLog(logId, itemId)
  }

  render() {
    return (
      <div className="ui container">
        {/* <Router history={history}> */}
          <>
            <Switch>
              {/* LogCreate */}
              <Route exact path='/item/:itemId/category/:id/log/new' component={LogCreate} />
              {/* LogShow */}
              <Route exact path='/log/:id' render={props =>
                <LogShow {...props}
                  log={this.props.selectedLog}
                />}
              />
              {/* LogEdit */}
              <Route exact path='/item/:itemId/log/:id/edit' render={props =>
                <LogEdit {...props}
                  log={this.props.selectedLog}
                />}
              />
              {/* CategoryCreate */}
              <Route exact path='/item/:itemId/category/new' component={CategoryCreate} />
              {/* Category Show / LogList */}
              <Route exact path='/item/:itemId/category/:id' render={props =>
                <LogList {...props}
                  category={this.props.selectedCategory}
                  item={this.props.selectedItem}
                  selectLog={this.selectLog}
                  editLogClick={this.editLogClick}
                  deleteLogClick={this.deleteLogClick}
                />}
              />
              {/* CategoryEdit */}
              <Route exact path='/item/:itemId/category/:id/edit' render={props =>
                <CategoryEdit {...props}
                  category={this.props.selectedCategory}
                />}
              />
              {/* ItemList */}
              <Route exact path="/items" render={props =>
                <ItemList {...props}
                  items={Object.values(this.props.items)}
                  selectItem={this.selectItem}
                  deleteItemClick={this.deleteItemClick}
                  editItemClick={this.editItemClick}
                />}
              />
              {/* ItemCreate */}
              <Route exact path="/item/new" component={ItemCreate} />
              {/* ItemEdit */}
              <Route exact path="/item/:id/edit" component={ItemEdit} />
              {/* Item Show / CategoryList */}
              <Route path="/item/:id" render={props =>
                <CategoryList {...props}
                  item={this.props.selectedItem}
                  selectCategory={this.selectCategory}
                  editCategoryClick={this.editCategoryClick}
                  deleteCategoryClick={this.deleteCategoryClick}
                />}
              />  
            </Switch>
          </>
      </div>
    )
  }
}

const mapStateToProps = state => {
  console.log(state.selectedItem)
  return {
    items: state.items,
    selectedItem: state.selectedItem,
    selectedCategory: state.selectedCategory,
    selectedLog: state.selectedLog,
  }
}

export default withRouter(connect(mapStateToProps, {
  itemSelector,
  categorySelector,
  logSelector,
  fetchItems,
  deleteItem,
  deleteCategory,
  deleteLog,
})(MaintenanceContainer));