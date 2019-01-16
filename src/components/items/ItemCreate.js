import React from "react";

import ItemForm from './ItemForm';

class ItemCreate extends React.Component {
  
  render() {
    return (
      <div>
        <h3>Create a New Item to Track</h3>
        <ItemForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default ItemCreate;
