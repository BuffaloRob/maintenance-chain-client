import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchItems } from '../../actions/itemActions';
import { fetchUser } from '../../actions/authActions';

class ItemList extends React.Component {

  componentDidMount() {
    // this.props.fetchUser();
    this.props.fetchItems();
  }

  renderAdmin(item) {
    if (item.user.id === this.props.currentUserId) {
      return (
        <div className='right floated content'>
          <Link className='ui button primary' to={`/items/edit/${item.id}`}>Edit</Link>
          <Link className='ui button negative' to={`/items/delete/${item.id}`}>Delete</Link>
        </div>
      )
    }
  }

  renderList() {
    return this.props.items.map(item => {
      return <div className="item" key={item.id}>
          {this.renderAdmin(item)}
          <i className="large middle aligned icon wrench" />
          <div className="content">{item.name}</div>
        </div>;
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
    items: Object.values(state.items),
    currentUserId: state.auth.currentUser.user_id,
    isAuthenticated: state.auth.isAuthenticated,
  });
}

export default connect(mapStateToProps, { fetchItems, fetchUser })(ItemList);