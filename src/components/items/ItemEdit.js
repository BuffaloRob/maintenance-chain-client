import React from "react";
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
        <ItemForm 
          onSubmit={this.onSubmit}
          initialValues={this.props.initialValues} 
        />
      </Container>
    )
  }
   
}

const mapStateToProps = (state, ownProps) => {
  return { 
    initialValues: state.items[ownProps.match.params.id]
  };
}

export default connect(mapStateToProps, { fetchItem, editItem })(ItemEdit);
