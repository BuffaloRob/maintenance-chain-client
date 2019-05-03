import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchCategories } from '../../actions/categoryActions';

class CategoryList extends React.Component {

  componentDidMount() {
    this.props.fetchCategories();
  }

  renderAdmin(category) {
    return (
      <div className='right floated content'>
        <Link className='ui button primary' to={`/items/edit/${category.id}`}>Edit</Link>
        <Link className='ui button negative' to={`/items/delete/${category.id}`}>Delete</Link>
      </div>
    )
  }

  renderList() {
    return this.props.items.map(item => {
      return (
        <div className="item" key={item.id}>
          {this.renderAdmin(item)}
          <i className="large middle aligned icon wrench" />
          <Link to={`items/show/${item.id}`} className='content'>{item.name}</Link>
        </div>
      )
    });
  }

  renderCreate() {
    if (this.props.isAuthenticated) {
      return (
        <div style={{ textAlign: 'right' }}>
          <Link to="/items/new" className='ui button primary'>
            Create New Item
          </Link>
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        <h2>Items</h2>
        <div className='ui celled list'>{this.renderList()}</div>
        {this.renderCreate()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return ({
    categories: Object.values(state.categories),
    currentUserId: state.auth.currentUser.user_id,
    isAuthenticated: state.auth.isAuthenticated,
  });
}

export default connect(mapStateToProps, { fetchCategories })(CategoryList);