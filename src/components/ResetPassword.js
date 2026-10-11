import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Link as RouterLink, useNavigate, useSearchParams } from 'react-router';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import FormError from './common/FormError';
import { useResetPasswordMutation } from '../store/api/maintenanceApi';
import { errorMessage } from '../store/api/errorMessage';

// Where the link in a password reset email goes (/reset-password?token=...).
// Setting the new password logs the user in.
const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [resetPassword] = useResetPasswordMutation();
  const { control, handleSubmit, setError, clearErrors, getValues, formState: { errors, isSubmitting } } = useForm({
    mode: 'onTouched',
    defaultValues: { password: '', password_confirmation: '' },
  });

  const rules = {
    password: { required: "You must enter a password" },
    password_confirmation: {
      validate: value => value === getValues('password') || "The passwords don't match",
    },
  };

  const onSubmit = async ({ password, password_confirmation }) => {
    try {
      await resetPassword({ token, password, password_confirmation }).unwrap();
      navigate('/');
    } catch (err) {
      setError('root.serverError', { message: errorMessage(err) });
    }
  };

  if (!token) {
    return (
      <Box sx={{ textAlign: 'center', mt: 5 }}>
        <Typography variant="h6" color="error" role="alert">This link is invalid or has expired</Typography>
        <Button component={RouterLink} to="/forgot-password" sx={{ mt: 2 }}>Request a new link</Button>
      </Box>
    );
  }

  const renderInput = (name, label) => (
    <Controller
      name={name}
      control={control}
      rules={rules[name]}
      render={({ field: { ref, onChange, ...field }, fieldState: { error } }) => (
        <TextField
          label={label}
          type="password"
          autoComplete="new-password"
          {...field}
          onChange={e => {
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant='h3' align='center'>New Password</Typography>
        {/* Centered under the heading, which is wider */}
        <Grid container direction='column' sx={{ alignItems: 'center' }}>
          {renderInput('password', 'New Password')}
          {renderInput('password_confirmation', 'Confirm New Password')}
        </Grid>
        <FormError errors={errors} />
        <Grid container sx={{
          justifyContent: 'center'
        }}>
          <Button
            type='submit'
            size='large'
            variant='outlined'
            color='primary'
            style={{ margin: '40px 0 16px' }}
            disabled={isSubmitting}
          >Submit</Button>
        </Grid>
        <Typography variant='body2' align='center'>
          <Link component={RouterLink} to='/forgot-password'>Need a new link?</Link>
        </Typography>
      </form>
    </Grid>
  );
};

export default ResetPassword;
