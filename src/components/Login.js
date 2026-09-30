import React from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { useLoginMutation } from '../store/api/maintenanceApi';

const renderInput = ({ input, label, meta, type }) => (
  <TextField
    label={label}
    autoComplete="off"
    type={type}
    {...input}
    margin="normal"
  />
);

const Login = ({ handleSubmit, error, history }) => {
  const [login] = useLoginMutation();

  const onSubmit = async formValues => {
    try {
      const res = await login(formValues).unwrap();
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
    <Grid container sx={{
      justifyContent: 'center'
    }}>
      {/* handleSubmit comes from reduxForm */}
      <form onSubmit={handleSubmit(onSubmit)} className='ui form error'>
        <Typography variant='h3' align='center'>Log In</Typography>
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
        <Grid container sx={{
          justifyContent: 'center'
        }}>
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
  form: 'login',
  validate
})(Login);

export default formWrapped;