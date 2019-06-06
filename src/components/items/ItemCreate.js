import React from "react";
import { connect } from 'react-redux';
import Container from "@material-ui/core/Container";

import ItemForm from './ItemForm';
import { createItem } from '../../actions/itemActions';

class ItemCreate extends React.Component {

  onSubmit = formValues => {
    this.props.createItem(formValues);
  }

  render() {
    return (
      <Container>
        <ItemForm onSubmit={this.onSubmit} />
      </Container>
    )
  }
  
}

export default connect(null, { createItem })(ItemCreate);
