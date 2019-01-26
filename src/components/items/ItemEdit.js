import React from "react";
import { connect } from 'react-redux';
import { fetchItem } from '../../actions';

class ItemEdit extends React.Component {

  componentDidMount() {
    this.props.fetchItem(this.props.match.params.id);
  }

  render() {
  if (!this.props.item.itemName) {
    return <div>Loading...</div>
  }

  return <div>{this.props.item.itemName}</div>
  }
   
}


const mapStateToProps = (state, ownProps) => {
  return { item: state.items[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchItem })(ItemEdit);
