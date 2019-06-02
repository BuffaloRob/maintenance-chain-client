import React from "react";
import _ from 'lodash';
import { connect } from 'react-redux';

import { createCategory, fetchCategories } from '../../actions/categoryActions';
import CategoryForm from "./CategoryForm";

import { Field, reduxForm } from 'redux-form'
import { TextField, Button, Box } from "@material-ui/core";


class CategoryCreate extends React.Component {

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
    this.props.createCategory(formValues, itemId);
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className='ui form error'>
        <Field
          name='category[name]'
          component={this.renderInput}
          label='Enter Category Name '
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

CategoryCreate = reduxForm({
  form: 'categoryForm',
  validate: validate
})(CategoryCreate);

export default connect(null, { createCategory })(CategoryCreate)