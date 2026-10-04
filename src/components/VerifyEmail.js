import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link as RouterLink, useSearchParams } from 'react-router';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

import { useVerifyEmailMutation } from '../store/api/maintenanceApi';
import { errorMessage } from '../store/api/errorMessage';
import { selectIsAuthenticated } from '../store/slices/authSlice';

// Where the link in a verification email goes (/verify-email?token=...).
// Works logged in or out, since the link may be opened on another device.
const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [verifyEmail, { isSuccess, error }] = useVerifyEmailMutation();
  const sent = useRef(false);

  useEffect(() => {
    // Once, though StrictMode runs effects twice in development
    if (!token || sent.current) return;
    sent.current = true;
    verifyEmail(token);
  }, [token, verifyEmail]);

  let message;
  if (!token) {
    message = <Typography variant="h6" color="error" role="alert">This link is invalid or has expired</Typography>;
  } else if (error) {
    message = <Typography variant="h6" color="error" role="alert">{errorMessage(error)}</Typography>;
  } else if (isSuccess) {
    message = <Typography variant="h6">Your email address is verified.</Typography>;
  } else {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <CircularProgress aria-label="Verifying your email address" />
      </Box>
    );
  }

  return (
    <Box sx={{ textAlign: 'center', mt: 5 }}>
      {message}
      {isAuthenticated
        ? <Button component={RouterLink} to="/" sx={{ mt: 2 }}>Continue</Button>
        : <Button component={RouterLink} to="/login" sx={{ mt: 2 }}>Continue to Log In</Button>}
    </Box>
  );
};

export default VerifyEmail;
