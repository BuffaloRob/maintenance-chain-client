import React from "react";
import { Link as RouterLink } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form'
import { TextField, Button, Box, Typography, Fab, Tooltip } from "@material-ui/core";
import ArrowBack from '@material-ui/icons/ArrowBack';

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
      <Box textAlign="center">
        <form onSubmit={this.props.handleSubmit(this.onSubmit)} className='ui form error'>
          <Field
            name='name'
            component={this.renderInput}
            label='Enter Item Name '
          /><br/>
          <br/>
          <Box>
            <Button color='primary' type='submit'>Submit</Button>
          </Box>
          <br/>
          <Box>
            <Fab
              color="secondary"
              aria-label="Back to Items"
              size="small"
              to={`/items`}
              component={RouterLink}
            >
              <Tooltip title="Back to Items">
                <ArrowBack />
              </Tooltip>
            </Fab>
          </Box>
        </form>
      </Box>
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
