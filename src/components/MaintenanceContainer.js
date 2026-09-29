import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

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
import { maintenanceApi } from '../store/api/maintenanceApi';
import { deleteLog } from '../actions/logActions';
import { itemSelector, categorySelector, logSelector } from '../actions/selectActions';
import PastDue from "../components/PastDue/PastDue";
import Upcoming from '../components/Upcoming/Upcoming';

class MaintenanceContainer extends React.Component {
  // Reads items from the RTK Query getItems cache (fetches only if not cached)
  getItem = async (itemId) => {
    const items = await this.props.loadItems()
    return items.find(item => item.id === Number(itemId))
  }

  selectItem = async (itemId) => {
    const item = await this.getItem(itemId)
    if (!item) return
    this.props.itemSelector(item)
    history.push(`/item/${item.id}`)
  }

  selectCategory = async (catId, itemId) => {
    const item = await this.getItem(itemId)
    if (!item) return
    this.props.itemSelector(item)
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

  editLogClick = (logId, itemId) => {
    const item = this.props.selectedItem
    const log = item.logs.filter(log => (log.id === logId))
    this.props.logSelector(log)
    history.push(`/item/${itemId}/log/${logId}/edit`)
  }

  deleteLogClick = (logId, itemId) => {
    this.props.deleteLog(logId, itemId)
  }

  selectPastDue = async (logId, itemId, catId) => {
    const item = await this.getItem(itemId)
    if (!item) return
    this.props.itemSelector(item)
    const cat = item.categories.filter(cat => (cat.id === catId))
    this.props.categorySelector(cat, itemId)
    const log = item.logs.filter(log => (log.id === logId))
    this.props.logSelector(log)
    history.push(`/log/${log[0].id}`)
  }

  selectUpcoming = async (logId, itemId, catId) => {
    const item = await this.getItem(itemId)
    if (!item) return
    this.props.itemSelector(item)
    const cat = item.categories.filter(cat => (cat.id === catId))
    this.props.categorySelector(cat, itemId)
    const log = item.logs.filter(log => (log.id === logId))
    this.props.logSelector(log)
    history.push(`/log/${log[0].id}`)
  }

  render() {

    if (this.props.isAuthenticated) {
      return (
        <div className="ui container">
          <>
            <Switch>
              {/* Past Due */}
              <Route exact path='/pastdue' render={props =>
                <PastDue {...props}
                  selectPastDue={this.selectPastDue}
                />}
              />
              {/* Upcoming */}
              <Route exact path='/upcoming' render={props =>
                <Upcoming {...props}
                  selectUpcoming={this.selectUpcoming}
                />}
              />
              {/* LogCreate */}
              <Route exact path='/item/:itemId/category/:id/log/new' component={LogCreate} />
              {/* LogShow */}
              <Route exact path='/log/:id' render={props =>
                <LogShow {...props}
                  log={this.props.selectedLog}
                  category={this.props.selectedCategory}
                  itemId={this.props.selectedItem.id}
                />}
              />
              {/* LogEdit */}
              <Route exact path='/item/:itemId/log/:id/edit' component={LogEdit} />
              {/* CategoryCreate */}
              <Route exact path='/item/:itemId/category/new' component={CategoryCreate} />
              {/* LogList / Category Show */}
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
              <Route exact path='/item/:itemId/category/:id/edit' component={CategoryEdit} />
              {/* ItemList */}
              <Route exact path="/items" render={props =>
                <ItemList {...props}
                  selectItem={this.selectItem}
                />}
              />
              {/* ItemCreate */}
              <Route exact path="/item/new" component={ItemCreate} />
              {/* ItemEdit */}
              <Route exact path="/item/:id/edit" component={ItemEdit} />
              {/* CategoryList / Item Show */}
              <Route exact path="/item/:id" render={props =>
                <CategoryList {...props}
                  selectCategory={this.selectCategory}
                />}
              />
              <Redirect to="/" />
            </Switch>
          </>
        </div>
      )
    }
    else {
      return ( 
        <Box textAlign="center">
          <Typography>You must be logged in to do that</Typography>
        </Box >
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    selectedItem: state.selectedItem,
    selectedCategory: state.selectedCategory,
    selectedLog: state.selectedLog,
  }
}

const mapDispatchToProps = dispatch => ({
  loadItems: () =>
    dispatch(maintenanceApi.endpoints.getItems.initiate(undefined, { subscribe: false })).unwrap(),
  ...bindActionCreators({
  itemSelector,
  categorySelector,
  logSelector,
  deleteLog,
  }, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(MaintenanceContainer);