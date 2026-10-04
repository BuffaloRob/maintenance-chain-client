import React from 'react';
import { useSelector } from 'react-redux';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useResendVerificationEmailMutation } from '../store/api/maintenanceApi';
import { errorMessage } from '../store/api/errorMessage';
import { selectCurrentUser, selectIsAuthenticated } from '../store/slices/authSlice';

// Asks logged-in users who haven't verified their email address to, which they
// have to before they can use the app, and can send the email again.
const VerifyEmailBanner = () => {
  const currentUser = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [resend, { isLoading, isSuccess, error }] = useResendVerificationEmailMutation();

  // false rather than missing: the Rails API doesn't send email_verified
  if (!isAuthenticated || currentUser.email_verified !== false) return null;

  const action = !isSuccess && (
    <Button color="inherit" size="small" onClick={() => resend()} disabled={isLoading}>
      Resend email
    </Button>
  );
  return (
    <Alert severity="info" role="status" action={action} sx={{ mt: 2 }}>
      {isSuccess
        ? `We sent a new link to ${currentUser.email}.`
        : `Please verify your email address to start using Maintenance Chain. We sent a link to ${currentUser.email}.`}
      {error && <Typography color="error" variant="body2" role="alert">{errorMessage(error)}</Typography>}
    </Alert>
  );
};

export default VerifyEmailBanner;
