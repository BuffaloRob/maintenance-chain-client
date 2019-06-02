import React from "react";
import { connect } from 'react-redux';

import ItemForm from './ItemForm';
import { createItem } from '../../actions/itemActions';
import { TextField, Typography, Container, Divider } from "@material-ui/core";
//need to import Connect() and wire up to action creator

class ItemCreate extends React.Component {

  onSubmit = formValues => {
    this.props.createItem(formValues);
  }

  render() {
    return (
      <Container>
        {/* <Typography variant="h5">
          Make a New Item
        </Typography>
        <Divider /> */}
        <ItemForm onSubmit={this.onSubmit} />
      </Container>
    )
  }
  
}

export default connect(null, { createItem })(ItemCreate);
