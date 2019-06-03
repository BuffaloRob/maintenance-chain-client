import React from "react";
import _ from 'lodash';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form'
import { TextField, Button, Box } from "@material-ui/core";

import { editCategory } from '../../actions/categoryActions';

class CategoryEdit extends React.Component {

  renderError({ error, touched }) {
    if (touched && error) {
      return <div className='header'>{error}</div>;
    }
  }

  renderInput = ({ input, label, meta }) => (
    <TextField
      label={label}
      autoComplete="off"
      {...input}
      margin="normal"
    />
  )

  onSubmit = formValues => {
    const itemId = this.props.match.params.itemId
    const catId = this.props.match.params.id
    this.props.editCategory(formValues, catId , itemId);
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className='ui form error'>
        <Field
          name='category[name]'
          component={this.renderInput}
          label='Edit Category Name '
        />
        <Box>
          <Button type='submit'>Submit</Button>
        </Box>
      </form>
    )
  }
}

const validate = formValues => {
  const errors = {};

  if (!formValues.name) {
    errors.name = "You Must Enter an Item Name"
  }

  return errors;
}

CategoryEdit = reduxForm({
  form: 'categoryForm',
  validate: validate
})(CategoryEdit);

export default withRouter(connect(null, { editCategory })(CategoryEdit))