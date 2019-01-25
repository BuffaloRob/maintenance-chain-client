import React from "react";
import { connect } from 'react-redux';

class ItemEdit extends React.Component {
  render() {
    return <div>ItemEdit</div>;
  }
}

const mapStateToProps = (state, ownProps) => {
  return { item: state.items[ownProps.match.params.id] };
}

export default connect(mapStateToProps)(ItemEdit);
