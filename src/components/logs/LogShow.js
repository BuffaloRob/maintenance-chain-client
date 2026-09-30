import React from "react";
import { Link as RouterLink } from 'react-router-dom';
import moment from 'moment';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import Fab from '@mui/material/Fab';
import ArrowBack from '@mui/icons-material/ArrowBack';
import { useGetItemsQuery } from '../../store/api/maintenanceApi';
import { BottomButtons, StyledLogListItem, StyledTypography } from "./styles";

const LogShow = ({ match }) => {
  // The URL only carries the log id, so find the owning item/log in the cache
  const { item, log } = useGetItemsQuery(undefined, {
    selectFromResult: ({ data }) => {
      const item = data && data.find(i => i.logs.some(l => String(l.id) === String(match.params.id)));
      return { item, log: item && item.logs.find(l => String(l.id) === String(match.params.id)) };
    },
  });
  const category = item && item.categories.find(c => c.id === log.category_id);

  if (!item || !log) {
    return <h3>...Loading</h3>
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
