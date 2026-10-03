import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import FormError from './common/FormError';
import { useSignupMutation } from '../store/api/maintenanceApi';
import { errorMessage } from '../store/api/errorMessage';

const rules = {
  email: { required: "You must enter an email address" },
  password: { required: "You must enter a password" },
};

const SignUp = () => {
  const navigate = useNavigate();
  const [signup] = useSignupMutation();
  const { control, handleSubmit, setError, clearErrors, formState: { errors, isSubmitting } } = useForm({
    mode: 'onTouched',
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async formValues => {
    try {
      const res = await signup(formValues).unwrap();
      if (res.message || !res.jwt) {
        setError('root.serverError', { message: res.message || 'Something went wrong' });
        return;
      }
      navigate("/");
    } catch (err) {
      setError('root.serverError', { message: errorMessage(err) });
    }
  };

  const renderInput = (name, type, label) => (
    <Controller
      name={name}
      control={control}
      rules={rules[name]}
      render={({ field: { ref, onChange, ...field }, fieldState: { error } }) => (
        <TextField
          label={label}
          autoComplete="off"
          type={type}
          {...field}
          onChange={e => {
            // As with redux-form, editing a field clears the server error
            clearErrors('root.serverError');
            onChange(e);
          }}
          inputRef={ref}
          margin="normal"
          error={!!error}
          helperText={error ? error.message : null}
        />
      )}
    />
  );

  return (
    <Grid container sx={{
      justifyContent: 'center'
    }}>
      <form onSubmit={handleSubmit(onSubmit)} className='ui form error'>
        <Typography variant='h3' align='center'>Sign Up</Typography>
        {renderInput('email', 'email', 'Enter Your Email')}<br />
        {renderInput('password', 'password', 'Enter Your Password')}
        <FormError errors={errors} />
        <Grid container sx={{
          justifyContent: 'center'
        }}>
          <Button
            type='submit'
            size='large'
            variant='outlined'
            color='primary'
            style={{ margin: '40px 0' }}
            disabled={isSubmitting}
          >Submit</Button>
        </Grid>
      </form>
    </Grid>
  );
};

export default SignUp;
