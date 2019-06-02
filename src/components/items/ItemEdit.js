import React from "react";
import _ from 'lodash';
import { connect } from 'react-redux';

import { fetchItem, editItem } from '../../actions/itemActions';
import ItemForm from "./ItemForm";
import { Container } from "@material-ui/core";

class ItemEdit extends React.Component {

  onSubmit = formValues => {
    this.props.editItem(this.props.match.params.id, formValues);
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


const mapStateToProps = (state, ownProps) => {
  return { 
    item: state.items[ownProps.match.params.id]
  };
}

export default connect(mapStateToProps, { fetchItem, editItem })(ItemEdit);
