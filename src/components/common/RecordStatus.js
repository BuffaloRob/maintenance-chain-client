import React from 'react';
import { Link as RouterLink } from 'react-router';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { errorMessage } from '../../store/api/errorMessage';

// Shown in place of a page whose record isn't available: a spinner while the
// request is loading, the error if it failed, otherwise "not found".
const RecordStatus = ({ isLoading, error, what, backTo, backLabel }) => {
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }
  return (
    <Box sx={{ textAlign: 'center', mt: 5 }}>
      {error ? (
        <Typography variant="h6" color="error" role="alert">{errorMessage(error)}</Typography>
      ) : (
        <Typography variant="h6">We couldn't find that {what}.</Typography>
      )}
      <Button component={RouterLink} to={backTo} sx={{ mt: 2 }}>{backLabel}</Button>
    </Box>
  );
};

export default RecordStatus;
