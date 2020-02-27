import React from "react";
import { Link as RouterLink } from 'react-router-dom';
import moment from 'moment';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import Divider from '@material-ui/core/Divider';
import Fab from '@material-ui/core/Fab';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { BottomButtons, StyledLogListItem } from "./styles";

const LogShow = ({ log, itemId }) => {
  const formattedDatePerformed = moment(log[0].date_performed).format("MMM Do YYYY");
  const formattedDateDue = moment(log[0].date_due).format("MMM Do YYYY");

  return (
    <Container>
      <Typography variant="h2">
        <Box textAlign="center">
          Log on {formattedDatePerformed}
        </Box>
      </Typography>
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
          <Typography variant="h5">${log[0].cost}</Typography>
        </StyledLogListItem>
        <Divider />
        <StyledLogListItem>
          <Typography variant="h5" color="primary">Tools Used:</Typography>
          <Typography variant="h5">{log[0].tools}</Typography>
        </StyledLogListItem>
        <Divider />
        <StyledLogListItem>
          <Typography variant="h5" color="primary">Notes:</Typography>
          <Typography variant="h5">{log[0].notes}</Typography>
        </StyledLogListItem>
        <Divider />
      </List>
      <BottomButtons>
        <Fab
          color="secondary"
          aria-label="Back to Logs"
          size="small"
          to={`/item/${itemId}/category/${log[0].category_id}`}
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
