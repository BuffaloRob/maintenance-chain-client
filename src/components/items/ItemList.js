import React from 'react';
import { connect } from 'react-redux';
import { fetchItems } from '../../actions';

class ItemList extends React.Component {

  componentDidMount() {
    this.props.fetchItems();
  }

  render() {
    return (
      <div>
        ItemList
      </div>
    )
  }
}

export default connect(null, { fetchItems })(ItemList);