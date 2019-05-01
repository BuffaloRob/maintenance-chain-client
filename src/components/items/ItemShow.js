import React from "react";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";

import { fetchItem } from '../../actions/itemActions';
import { fetchCategories } from '../../actions/categoryActions';


class ItemShow extends React.Component {

  componentDidMount() {
    const itemId = this.props.match.params.id
    this.props.fetchCategories(itemId)
  }

  renderAdmin(category) {
   
    const itemId = this.props.match.params.id
    //authenticating differenetly than in ItemList
    if (this.props.isAuthenticated) {
      return (
        <div className='right floated content'>
          <Link className='ui button primary' to={`items/${itemId}/categories/edit/${category.id}`}>Edit</Link>
          <Link className='ui button negative' to={`items/${itemId}/categories/delete/${category.id}`}>Delete</Link>
        </div>
      )
    }
  }

  renderList() {
    return this.props.categories.map(cat => {
      return (
        <div className='category' key={cat.id}>

        </div>
      )
    })
  }

  renderCreate() {
    const itemId = this.props.match.params.id

    if (this.props.isAuthenticated) {
      return (
        <div style={{ textAlign: 'right' }}>
          <Link to={`items/${itemId}/categories/new`} className='ui button primary'>Create New Category</Link>
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        <h3>Maintenance Categories for {this.props.item.name}</h3>
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
    isAuthenticated: state.auth.isAuthenticated
  })
}

export default connect(mapStateToProps, { fetchItem, fetchCategories })(ItemShow);

// get item :id from url params and use that to make list of categories for that item
