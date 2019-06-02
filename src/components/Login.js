import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { login } from '../actions/authActions';
import { TextField, Button, Box, Typography } from '@material-ui/core';

class Login extends React.Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className='ui error message'>
          <div className='header'>{error}</div>
        </div>
      );
    }
  }

  //   const className = `field ${meta.error && meta.touched ? 'error' : ''}`
  renderInput = ({ input, label, meta, type }) => (
    <TextField
      label={label}
      autoComplete="off"
      type={type}
      {...input}
      margin="normal"
    />
  )

  onSubmit = formValues => {
    this.props.login(formValues, () => this.props.history.push("/"));
  }

  render() {
    return (
      
      // handleSubmit comes from reduxForm
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className='ui form error'>
        <Typography>Log In</Typography>
        <Field 
          name='email' 
          type='email' 
          component={this.renderInput} 
          label='Enter Your Email'
         /><br/>
        <Field 
          name='password' 
          type='password' 
          component={this.renderInput} 
          label='Enter Your Password'
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

  if (!formValues.email) {
    errors.email = "You must enter an email address";
  }
  if (!formValues.password) {
    errors.password = "You must enter a password";
  }
  return errors;
}

const formWrapped = reduxForm({
  form: 'login',
  validate
})(Login);

export default connect(null, { login })(formWrapped);