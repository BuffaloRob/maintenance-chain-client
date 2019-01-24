import React from 'react';
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
          <button className='ui button primary'>Edit</button>
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

  render() {
    return (
      <div>
        <h2>Items</h2>
        <div className='ui celled list'>{this.renderList()}</div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return ({ 
    items: Object.values(state.items),
    currentUserId: state.auth.userId
  });
}

export default connect(mapStateToProps, { fetchItems })(ItemList);