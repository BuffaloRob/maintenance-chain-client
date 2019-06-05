import React from "react";
import { Link as RouterLink } from 'react-router-dom';
import moment from 'moment';
import { Container, Typography, Box, List, ListItem, ListItemSecondaryAction, Divider, Button } from "@material-ui/core";


const LogShow = ({ log, item }) => {
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
          <Typography variant="h6" color="primary">Due On : </Typography>
          <Typography variant="h6">{formattedDatePerformed}</Typography>
        </ListItem>
        <Divider />
        <ListItem>
          <Typography variant="h6" color="primary">Due On :</Typography>
          <Typography variant="h6">{formattedDateDue}</Typography>
        </ListItem>
        <Divider />
        <ListItem>
          <Typography variant="h6" color="primary">Cost :</Typography>
          <Typography variant="h6">${log[0].cost}</Typography>
        </ListItem>
        <Divider />
        <ListItem>
          <Typography variant="h6" color="primary">Tools Used :</Typography>
          <Typography variant="h6">{log[0].tools}</Typography>
        </ListItem>
        <Divider />
        <ListItem>
          <Typography variant="h6" color="primary">Notes :</Typography>
          <Typography variant="h6">{log[0].notes}</Typography>
        </ListItem>
        <Divider />
      </List>
      <Box textAlign="left">
        <Button 
          to={`/item/${item.id}/category/${log.category_id}`}
          component={RouterLink}
        >
          Back to List of Logs
        </Button>
      </Box>
    </Container>
  )
}

export default LogShow;
