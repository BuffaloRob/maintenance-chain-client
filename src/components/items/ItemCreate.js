import React from "react";
import { connect } from 'react-redux';

import ItemForm from './ItemForm';
import { createItem } from '../../actions';
//need to import Connect() and wire up to action creator

class ItemCreate extends React.Component {

  onSubmit = formValues => {
    this.props.createItem(formValues);
  }

  render() {
    return (
      <div>
        <h3>Create a New Item to Track</h3>
        <ItemForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default connect(null, { createItem })(ItemCreate);
