import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Link as RouterLink } from 'react-router';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import FormError from './common/FormError';
import { useForgotPasswordMutation } from '../store/api/maintenanceApi';
import { errorMessage } from '../store/api/errorMessage';

// Asks the API to email a link to /reset-password. The API answers the same
// whether or not the address has an account, and so does this page.
const ForgotPassword = () => {
  const [forgotPassword] = useForgotPasswordMutation();
  const [sentTo, setSentTo] = useState(null);
  const { control, handleSubmit, setError, clearErrors, formState: { errors, isSubmitting } } = useForm({
    mode: 'onTouched',
    defaultValues: { email: '' },
  });

  const onSubmit = async ({ email }) => {
    try {
      await forgotPassword(email).unwrap();
      setSentTo(email);
    } catch (err) {
      setError('root.serverError', { message: errorMessage(err) });
    }
  };

  if (sentTo) {
    return (
      <Box sx={{ textAlign: 'center', mt: 5 }}>
        <Typography variant="h6">
          If there's an account for {sentTo}, we've emailed it a link to reset the password.
        </Typography>
        <Button component={RouterLink} to="/login" sx={{ mt: 2 }}>Back to Log In</Button>
      </Box>
    );
  }

  return (
    <Grid container sx={{
      justifyContent: 'center'
    }}>
      <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: 400 }}>
        <Typography variant='h3' align='center'>Reset Password</Typography>
        <Typography align='center' sx={{ mt: 2 }}>
          Enter your email address and we'll send you a link to choose a new password.
        </Typography>
        <Grid container sx={{ justifyContent: 'center' }}>
          <Controller
            name="email"
            control={control}
            rules={{ required: "You must enter an email address" }}
            render={({ field: { ref, onChange, ...field }, fieldState: { error } }) => (
              <TextField
                label="Enter Your Email"
                type="email"
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
            style={{ margin: '40px 0' }}
            disabled={isSubmitting}
          >Submit</Button>
        </Grid>
      </form>
    </Grid>
  );
};

export default ForgotPassword;
