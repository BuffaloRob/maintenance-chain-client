import React from "react";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";

import { fetchItem } from '../../actions/itemActions';
import { fetchLog } from '../../actions/logActions';

//Refactor this into the CategoryList component
class LogShow extends React.Component {

  componentDidMount() {
    const logId = this.props.match.params.id
    this.props.fetchLog(logId)
  }

  renderAdmin(category) {

    const itemId = this.props.match.params.id
    //authenticating differenetly than in ItemList
    if (this.props.isAuthenticated) {
      return (
        <div className='right floated content'>
          <Link className='ui button primary' to={`/items/${itemId}/categories/edit/${category.id}`}>Edit</Link>
          <Link className='ui button negative' to={`/items/${itemId}/categories/delete/${category.id}`}>Delete</Link>
        </div>
      )
    }
  }

  renderList() {
    const logId = parseInt(this.props.match.params.id)

    return this.props.categories.map(log => {
      // change if statement to make sense
      if (logId === log.id) {
        return (
          <div className='item' key={log.id} >
            {this.renderAdmin(log)}
            <li>{log.date_due}</li>
            <li>{log.date_performed}</li>
            <li>{log.cost}</li>
            <li>{log.tools}</li>
            <li>{log.notes}</li>
          </div>
        )
      }
    });
  }

  render() {
    return (
      <div>
        <h3>Maintenance Categories for {this.props.item.name}</h3>
        <div className='ui celled list'>{this.renderList()}</div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return ({
    item: state.items[ownProps.match.params.id],
    categories: Object.values(state.categories),
    isAuthenticated: state.auth.isAuthenticated
  })
}

export default connect(mapStateToProps, { fetchItem, fetchLog })(LogShow);

// get item :id from url params and use that to make list of categories for that item
