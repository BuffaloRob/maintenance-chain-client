import React from "react";
import { Field, reduxForm } from 'redux-form'
import { TextField, Button, Box } from "@material-ui/core";

class ItemForm extends React.Component {

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

export default reduxForm({
  form: 'itemForm',
  validate: validate
})(ItemForm);
