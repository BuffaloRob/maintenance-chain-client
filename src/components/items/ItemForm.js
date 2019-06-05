import React from "react";
import { Link as RouterLink } from 'react-router-dom';
import { Field, reduxForm, values } from 'redux-form'
import { TextField, Button, Box, Typography } from "@material-ui/core";

class ItemForm extends React.Component {

  renderError({ error, touched }) {
    if (touched && error) {
      // return <div className='header'>{error}</div>;
      return (
        <Typography>{error}</Typography>
      )
    }
  }

  renderInput = ({ input, label, meta: {touched, error} }) => (
    <TextField
      label={label}
      autoComplete="off"
      {...input}
      margin="normal"
      // error={touched && error}
    />
  )

  onSubmit = formValues => {
    this.props.onSubmit(formValues);
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className='ui form error'>
        <Field
          name='item[name]'
          component={this.renderInput}
          label='Enter Item Name '
        />
        <Box>
          <Button type='submit'>Submit</Button>
        </Box>
        <Box>
          <Button
            to={'/items'}
            component={RouterLink}
          >
            Back to List of Items
          </Button>
        </Box>
      </form>
    )
  }
}

// const validate = formValues => {
//   const errors = {};

//   if (!formValues.name) {
//     errors.name = "You Must Enter an Item Name"
//   }
//   return errors;
// }

const validate = values => {
  const errors = {};
  const requiredFields = [
    'item[name]',
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })
  return errors
}

export default reduxForm({
  form: 'itemForm',
  validate: validate
})(ItemForm);
