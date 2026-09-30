import React from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import { useSignupMutation } from '../store/api/maintenanceApi';

const renderInput = ({ input, label, meta, type }) => (
  <TextField
    label={label}
    autoComplete="off"
    type={type}
    {...input}
    margin="normal"
  />
);

const SignUp = ({ handleSubmit, error, history }) => {
  const [signup] = useSignupMutation();

  const onSubmit = async formValues => {
    try {
      const res = await signup(formValues).unwrap();
      if (res.message || !res.jwt) {
        throw new SubmissionError({ _error: res.message || 'Something went wrong' });
      }
      history.push("/");
    } catch (err) {
      if (err instanceof SubmissionError) throw err;
      const data = err && err.data;
      const message =
        (data && (data.message || (data.errors && JSON.stringify(data.errors)))) ||
        'Something went wrong';
      throw new SubmissionError({ _error: message });
    }
  };

  return (
    <Grid justify='center' container>
      {/* handleSubmit comes from reduxForm */}
      <form onSubmit={handleSubmit(onSubmit)} className='ui form error'>
        <Typography variant='h3' align='center'>Sign Up</Typography>
        <Field
          name='email'
          type='email'
          component={renderInput}
          label='Enter Your Email'
        /><br />
        <Field
          name='password'
          type='password'
          component={renderInput}
          label='Enter Your Password'
        />
        {error && (
          <Typography color='error' align='center' role='alert'>{error}</Typography>
        )}
        <Grid container justify='center'>
          <Button
            type='submit'
            size='large'
            variant='outlined'
            color='primary'
            style={{ margin: '40px 0' }}
          >Submit</Button>
        </Grid>
      </form>
    </Grid>
  );
};

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
  form: 'signup',
  validate
})(SignUp);

export default formWrapped;
  