import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchItems } from '../../actions';

class ItemList extends React.Component {

  componentDidMount() {
    this.props.fetchItems();
  }

  renderAdmin(item) {
    if (item.userId === this.props.currentUserId) {
      return (
        <div className='right floated content'>
          <Link className='ui button primary' to={`/items/edit/${item.id}`}>Edit</Link>
          <button className='ui button negative'>Delete</button>
        </div>
      )
    }
  }

  renderList() {
    return this.props.items.map(item => {
      return <div className="item" key={item.id}>
          {this.renderAdmin(item)}
          <i className="large middle aligned icon camera" />
          <div className="content">{item.itemName}</div>
        </div>;
    });
  }

  renderCreate() {
    if (this.props.isSignedIn) {
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
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn,
  });
}

export default connect(mapStateToProps, { fetchItems })(ItemList);