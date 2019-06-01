import React from "react";
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';

import history from '../history';

import ItemList from './items/ItemList';
import ItemCreate from './items/ItemCreate';
import ItemDelete from './items/ItemDelete';
import ItemEdit from './items/ItemEdit';

import CategoryCreate from './categories/CategoryCreate';
import CategoryDelete from './categories/CategoryDelete';
import CategoryEdit from './categories/CategoryEdit';
import CategoryList from './categories/CategoryList';

import LogCreate from './logs/LogCreate';
import LogDelete from './logs/LogDelete';
import LogEdit from './logs/LogEdit';
import LogShow from './logs/LogShow';
import LogList from './logs/LogList';


import { fetchItems } from '../actions/itemActions';
import { fetchCategories } from '../actions/categoryActions'
import { fetchLogs } from '../actions/logActions'
import { itemSelector, categorySelector, logSelector, selectItemOnCatEdit } from '../actions/selectActions';

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
    history.push(`/log/${log.id}`)
  }

  editCategoryClick = (catId, itemId) => {
    const item = this.props.selectedItem
    const cat = item.categories.filter(cat => (cat.id === catId))
    this.props.categorySelector(cat, itemId)
    history.push(`/item/${itemId}/category/${catId}/edit`)
  }

  // editCategoryClick = async (catId, itemId) => {
  //   await this.props.fetchCategories(itemId)
  //   const item = this.props.selectedItem
  //   const cat = item.categories.filter(cat => (cat.id === catId))
  //   this.props.categorySelector(cat, itemId)
  //   history.push(`/item/${itemId}/category/${catId}/edit`)
  // }

  render() {
    return (
      <div className="ui container">
        {/* <Router history={history}> */}
          <>
            <Switch>
              <Route exact path='/log/:id' render={props =>
                <LogShow {...props}
                  log={this.props.selectedLog}
                />}
              />
              <Route exact path='/item/:itemId/category/:id/log/new' component={LogCreate} />

              <Route exact path='/item/:itemId/category/new' component={CategoryCreate} />
              <Route exact path='/item/:itemId/category/:id' render={props =>
                <LogList {...props}
                  category={this.props.selectedCategory}
                  item={this.props.selectedItem}
                  selectLog={this.selectLog}
                />}
              />
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
                <CategoryList {...props}
                  item={this.props.selectedItem}
                  selectCategory={this.selectCategory}
                  editCategoryClick={this.editCategoryClick}
                />}
              />  
            </Switch>
          </>
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

export default withRouter(connect(mapStateToProps, {
  itemSelector,
  categorySelector,
  logSelector,
  selectItemOnCatEdit,
  fetchItems,
  fetchCategories,
  fetchLogs,
})(MaintenanceContainer));