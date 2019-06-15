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

const LogShow = ({ log, itemId }) => {
  const formattedDatePerformed = moment(log[0].date_performed).format("MMM Do YYYY");
  const formattedDateDue = moment(log[0].date_due).format("MMM Do YYYY");

  return (
    <Container>
      <Typography variant="h4">
        <Box textAlign="center">
          Log for {formattedDatePerformed}
        </Box>
        <Divider />
      </Typography>
      <List>
        <ListItem>
          <Typography variant="subtitle2" color="primary">Performed On: </Typography>
          <Typography variant="subtitle1">{formattedDatePerformed}</Typography>
        </ListItem>
        <Divider />
        <ListItem>
          <Typography variant="subtitle2" color="primary">Due On:</Typography>
          <Typography variant="subtitle1">{formattedDateDue}</Typography>
        </ListItem>
        <Divider />
        <ListItem>
          <Typography variant="subtitle2" color="primary">Cost:</Typography>
          <Typography variant="subtitle1">${log[0].cost}</Typography>
        </ListItem>
        <Divider />
        <ListItem>
          <Typography variant="subtitle2" color="primary">Tools Used:</Typography>
          <Typography variant="subtitle1">{log[0].tools}</Typography>
        </ListItem>
        <Divider />
        <ListItem>
          <Typography variant="subtitle2" color="primary">Notes:</Typography>
          <Typography variant="subtitle1">{log[0].notes}</Typography>
        </ListItem>
        <Divider />
      </List>
      <Box textAlign="left">
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
      </Box>
    </Container>
  )
}

export default LogShow;
