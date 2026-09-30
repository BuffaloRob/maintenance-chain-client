import React from "react";
import { Link as RouterLink, useParams } from 'react-router';
import moment from 'moment';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import Fab from '@mui/material/Fab';
import ArrowBack from '@mui/icons-material/ArrowBack';
import RecordStatus from '../common/RecordStatus';
import { useLog } from '../../store/api/lookups';
import { BottomButtons, StyledLogListItem, StyledTypography } from "./styles";

const LogShow = () => {
  const params = useParams();
  // The URL only carries the log id, so the owning item is found by it
  const { item, log, category, isLoading, error } = useLog(params.id);

  if (!log) {
    return <RecordStatus isLoading={isLoading} error={error} what="log" backTo="/items" backLabel="Back to items" />;
  }
  const itemId = item.id;

  const formattedDatePerformed = moment(log.date_performed).format("MMM Do YYYY");
  const formattedDateDue = moment(log.date_due).format("MMM Do YYYY");

  return (
    <Container>
      <StyledTypography variant="h2">
        {(category ? category.name : '')} on {formattedDatePerformed}
      </StyledTypography>
      <List>
        <StyledLogListItem alignItems="flex-start">
          <Typography variant="h5" color="primary">Performed On:</Typography>
          <Typography variant="h5">{formattedDatePerformed}</Typography>
        </StyledLogListItem>
        <Divider />
        <StyledLogListItem>
          <Typography variant="h5" color="primary">Due On:</Typography>
          <Typography variant="h5">{formattedDateDue}</Typography>
        </StyledLogListItem>
        <Divider />
        <StyledLogListItem>
          <Typography variant="h5" color="primary">Cost:</Typography>
          <Typography variant="h5">${log.cost}</Typography>
        </StyledLogListItem>
        <Divider />
        <StyledLogListItem>
          <Typography variant="h5" color="primary">Tools Used:</Typography>
          <Typography variant="h5">{log.tools}</Typography>
        </StyledLogListItem>
        <Divider />
        <StyledLogListItem>
          <Typography variant="h5" color="primary">Notes:</Typography>
          <Typography variant="h5">{log.notes}</Typography>
        </StyledLogListItem>
        <Divider />
      </List>
      <BottomButtons>
        <Fab
          color="secondary"
          aria-label="Back to Logs"
          size="small"
          to={`/item/${itemId}/category/${log.category_id}`}
          component={RouterLink}
        >
          <Tooltip title="Back to Logs">
            <ArrowBack />
          </Tooltip>
        </Fab>
      </BottomButtons>
    </Container>
  )
}

export default LogShow;
