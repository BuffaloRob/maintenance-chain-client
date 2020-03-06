import React from "react";
import { connect } from 'react-redux';
import Typography from "@material-ui/core/Typography";

import { editItem } from '../../actions/itemActions';
import ItemForm from "./ItemForm";
import { StyledGridContainer } from './styles'

class ItemEdit extends React.Component {

  onSubmit = formValues => {
    this.props.editItem(this.props.match.params.id, formValues);
  }

  render() {
    return (
      <StyledGridContainer container justify='center'>
        <Typography variant='h3' align='center'>Edit the Name</Typography>
        <ItemForm 
          onSubmit={this.onSubmit}
          initialValues={this.props.initialValues} 
        />
      </StyledGridContainer>
    )
  }
   
}

const mapStateToProps = (state, ownProps) => {
  return { 
    initialValues: state.items[ownProps.match.params.id]
  };
}

export default connect(mapStateToProps, { editItem })(ItemEdit);
