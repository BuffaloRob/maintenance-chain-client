import React from "react";
import { connect } from 'react-redux';
import { Route, withRouter, Router } from 'react-router-dom';

import history from '../history';

import ItemList from '../components/items/ItemList';
import ItemCreate from '../components/items/ItemCreate';
import ItemDelete from '../components/items/ItemDelete';
import ItemEdit from '../components/items/ItemEdit';

import CategoryCreate from '../components/categories/CategoryCreate';
import CategoryDelete from '../components/categories/CategoryDelete';
import CategoryEdit from '../components/categories/CategoryEdit';
import CategoryList from '../components/categories/CategoryList';

import LogCreate from '../components/logs/LogCreate';
import LogDelete from '../components/logs/LogDelete';
import LogEdit from '../components/logs/LogEdit';
import LogShow from '../components/logs/LogShow';
import LogList from '../components/logs/LogList';


import { fetchItems } from '../actions/itemActions';
import { fetchCategories } from '../actions/categoryActions'
import { fetchLogs } from '../actions/logActions'
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
              <Route exact path='/log/:id' render={props =>
                <LogShow {...props}
                  log={this.props.selectedLog}
                />}
              />

              <Route exact path='/item/:itemId/category/new' component={CategoryCreate} />
              <Route exact path='/item/:itemId/category/:id' render={props =>
                <LogList {...props}
                  category={this.props.selectedCategory}
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
})(MaintenanceContainer);