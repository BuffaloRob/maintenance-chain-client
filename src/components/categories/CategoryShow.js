import React from "react";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";

import { fetchLogs } from '../../actions/logActions';


class CategoryShow extends React.Component {

  componentDidMount() {
    const itemId = this.props.match.params.id
    this.props.fetchLogs(itemId)
  }

  renderAdmin(log) {

    const itemId = this.props.match.params.id
    //authenticating differenetly than in ItemList
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
    const itemId = parseInt(this.props.match.params.id)

    return this.props.logs.map(log => {
      if (itemId === log.item.id) {
        return (
          <div className='item' key={log.id} >
            {this.renderAdmin(log)}
            <Link to={`items/${itemId}/categories/${log.id}`} className='content'>{log.name}</Link>
          </div>
        )
      }
    });
  }

  renderCreate() {
    const itemId = this.props.match.params.id

    if (this.props.isAuthenticated) {
      return (
        <div style={{ textAlign: 'right' }} >
          <Link to={`/items/${itemId}/logs/new`} className='ui button primary'>Create New Log</Link>
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        <h3>Maintenance Logs for {this.props.item.name}</h3>
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
