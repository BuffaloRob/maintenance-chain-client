import React from 'react';
import Typography from '@mui/material/Typography';

// A form's server error, set with setError('root.serverError', { message })
const FormError = ({ errors }) => {
  const message = errors.root && errors.root.serverError && errors.root.serverError.message;
  if (!message) return null;
  return <Typography color="error" align="center" role="alert">{message}</Typography>;
};

export default FormError;
