import React from "react";
import { connect } from 'react-redux';
import Typography from "@material-ui/core/Typography";

import ItemForm from './ItemForm';
import { createItem } from '../../actions/itemActions';
import { StyledGridContainer } from "./styles";

class ItemCreate extends React.Component {

  onSubmit = formValues => {
    this.props.createItem(formValues);
  }

  render() {
    return (
      <StyledGridContainer container justify='center'>
        <Typography variant='h3' align='center'>Make a new item to track</Typography>
        <ItemForm onSubmit={this.onSubmit} />
      </StyledGridContainer>
    )
  }
  
}

export default connect(null, { createItem })(ItemCreate);
