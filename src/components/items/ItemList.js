import React from 'react';
import { connect } from 'react-redux';
import { fetchItems } from '../../actions';

class ItemList extends React.Component {

  componentDidMount() {
    this.props.fetchItems();
  }

  renderList() {
    return this.props.items.map(item => {
      return (
        <div className='item' key={item.id}>
          <i className='large middle aligned icon camera' />
          <div className='content'>
            {item.itemName}
          </div>
        </div>
      );
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
  return ({ items: Object.values(state.items) });
}
export default connect(mapStateToProps, { fetchItems })(ItemList);