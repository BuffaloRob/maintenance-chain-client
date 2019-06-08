import React from "react";
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form'
import { TextField, Button, Box, Fab, Tooltip } from "@material-ui/core";
import ArrowBack from '@material-ui/icons/ArrowBack';

import { createCategory } from '../../actions/categoryActions';


class CategoryCreate extends React.Component {

  renderError({ error, touched }) {
    if (touched && error) {
      return <div className='header'>{error}</div>;
    }
  }

  renderInput = ({ input, label, meta: {touched, error} }) => (
    <TextField
      label={label}
      autoComplete="off"
      {...input}
      margin="normal"
      error={touched && error}
      helperText={touched && error ? error : null}
    />
  )

  onSubmit = formValues => {
    const itemId = this.props.match.params.itemId
    this.props.createCategory(formValues, itemId);
  }

  render() {
    return (
      <Box textAlign="center">
        <form onSubmit={this.props.handleSubmit(this.onSubmit)} className='ui form error'>
          <Field
            name='name'
            component={this.renderInput}
            label='Enter Category Name '
          /><br/>
          <br/>
          <Box>
            <Button color='primary' type='submit'>Submit</Button>
          </Box>
          <br/>
          <Box>
            <Fab
              color="secondary"
              aria-label="Back to Categories"
              size="small"
              to={`/item/${this.props.match.params.itemId}`}
              component={RouterLink}
            >
              <Tooltip title="Back to Categories">
                <ArrowBack />
              </Tooltip>
            </Fab> 
          </Box>
        </form>
      </Box>
    )
  }
}

const validate = values => {
  const errors = {};
  const requiredFields = [
    'name',
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })
  return errors
}

CategoryCreate = reduxForm({
  form: 'categoryForm',
  validate: validate
})(CategoryCreate);

export default connect(null, { createCategory })(CategoryCreate)