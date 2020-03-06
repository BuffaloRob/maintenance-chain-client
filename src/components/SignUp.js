import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import { signup } from '../actions/authActions';

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
      <Grid justify='center' container>
        {/* handleSubmit comes from reduxForm */}
        <form onSubmit={this.props.handleSubmit(this.onSubmit)} className='ui form error'>
          <Typography variant='h2'>Sign Up</Typography>
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
          <Grid container justify='center'>
            <Button 
              type='submit' 
              size='large' 
              variant='contained'
              color='primary'  
              style={{ margin: '40px 0' }}
            >Submit</Button>
          </Grid>
        </form>
      </Grid>
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
  