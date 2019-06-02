import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { signup } from '../actions/authActions';
import { TextField, Button, Box, Typography } from '@material-ui/core';

class SignUp extends React.Component {

  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className='ui error message'>
          <div className='header'>{error}</div>
        </div>
      );
    }
  }

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
    this.props.signup(formValues, () => this.props.history.push("/"));
  }

  render() {
    return (
      // handleSubmit comes from reduxForm
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className='ui form error'>
        <Typography>Sign Up</Typography>
        <Field
          name='email'
          type='email'
          component={this.renderInput}
          label='Enter Your Email'
        /><br />
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

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isAuthenticating: state.auth.isAuthenticating,
    currentUser: state.auth.currentUser,
    token: state.auth.token
  }
}

const formWrapped = reduxForm({ 
  form: 'signup',
  validate
})(SignUp);

export default connect(mapStateToProps, { signup })(formWrapped);
  