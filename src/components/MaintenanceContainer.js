import React from "react";
import { connect } from 'react-redux';
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
import PastDue from "../components/PastDue/PastDue";
import Upcoming from '../components/Upcoming/Upcoming';

class MaintenanceContainer extends React.Component {
  // Navigation only: selected item/category/log are derived from the
  // RTK Query getItems cache by the URL params in each component.
  selectItem = (itemId) => {
    history.push(`/item/${itemId}`)
  }

  selectCategory = (catId, itemId) => {
    history.push(`/item/${itemId}/category/${catId}`)
  }

  selectPastDue = (logId) => {
    history.push(`/log/${logId}`)
  }

  selectUpcoming = (logId) => {
    history.push(`/log/${logId}`)
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
              <Route exact path='/log/:id' component={LogShow} />
              {/* LogEdit */}
              <Route exact path='/item/:itemId/log/:id/edit' component={LogEdit} />
              {/* CategoryCreate */}
              <Route exact path='/item/:itemId/category/new' component={CategoryCreate} />
              {/* LogList / Category Show */}
              <Route exact path='/item/:itemId/category/:id' component={LogList} />
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
  }
}

export default connect(mapStateToProps)(MaintenanceContainer);
