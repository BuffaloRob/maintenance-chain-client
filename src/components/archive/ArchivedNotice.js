import React from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useUnarchiveItemMutation } from '../../store/api/maintenanceApi';
import { errorMessage } from '../../store/api/errorMessage';
import { formatDate } from '../../store/api/dueStatus';

// Says on an archived item's page that it's archived, and restores it
const ArchivedNotice = ({ item }) => {
  const [unarchiveItem, { isLoading, error }] = useUnarchiveItemMutation();

  const action = (
    <Button color="inherit" size="small" onClick={() => unarchiveItem(item.id)} disabled={isLoading}>
      Restore
    </Button>
  );
  return (
    <Alert severity="info" role="status" action={action} sx={{ mb: 3 }}>
      Archived {formatDate(item.archived_at)}. Its maintenance isn't in Upcoming or Past Due.
      {error && <Typography color="error" variant="body2" role="alert">{errorMessage(error)}</Typography>}
    </Alert>
  );
};

export default ArchivedNotice;
