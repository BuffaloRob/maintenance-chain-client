import React from "react";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";

import { fetchLogs } from '../../actions/logActions';

// Refactor this into the LogList component

class CategoryShow extends React.Component {
  
  componentDidMount() {
    const itemId = this.props.match.params.itemId
    this.props.fetchLogs(itemId)
  }

  renderAdmin(log) {
    const itemId = this.props.match.params.itemId

    if (this.props.isAuthenticated) {
      return (
        <div className='right floated content'>
          <Link className='ui button primary' to={`/items/${itemId}/logs/edit/${log.id}`}>Edit</Link>
          <Link className='ui button negative' to={`/items/${itemId}/logs/delete/${log.id}`}>Delete</Link>
        </div>
      )
    }
  }

  renderList() {
    const itemId = parseInt(this.props.match.params.itemId)

    // catArray returns an array of category objects for that item but only the one that matches the URL catId will have info, the rest will be empty objects
    const catArray = this.props.categories.map(cat => {
      if (cat.id === parseInt(this.props.match.params.id)) {
        return cat
      }
    })
    // filteredArray removes any empty objects from catArray
    const filteredArray = catArray.filter(cat => cat);
    // catName & catId pull the info from the only object in filteredArray
    const catName = filteredArray[0].name;
    const catId = parseInt(filteredArray[0].id);

    return this.props.logs.map(log => {
      if (catId === log.cat.id) {
        return (
          <div className='item' key={log.id} >
            {this.renderAdmin(log)}
            <Link to={`items/${itemId}/categories/${log.id}`} className='content'>{log.name}</Link>
            {catName}
          </div>
        )
      }
    });
  }

  renderCreate() {
    const itemId = this.props.match.params.itemId

    if (this.props.isAuthenticated) {
      return (
        <div style={{ textAlign: 'right' }} >
          <Link to={`/items/${itemId}/logs/new`} className='ui button primary'>Create New Log</Link>
        </div>
      )
    }
  }

  render() {
    const catArray = this.props.categories.map(cat => {
      if (cat.id === parseInt(this.props.match.params.id)) {
        return cat
      }
    })
    const filteredArray = catArray.filter(cat => cat);
    const catName = filteredArray[0].name;

    return (
      <div>
        {/* <h3>Maintenance Logs for {this.props.item.name}</h3> */}
        <h3>Maintenance Logs for {catName}</h3>
        <div className='ui celled list'>{this.renderList()}</div>
        {this.renderCreate()}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return ({
    item: state.items[ownProps.match.params.id],
    categories: Object.values(state.categories),
    logs: Object.values(state.logs),
    isAuthenticated: state.auth.isAuthenticated
  })
}

export default connect(mapStateToProps, { fetchLogs })(CategoryShow);
