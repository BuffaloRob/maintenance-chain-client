import React from 'react';
import moment from 'moment';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import { ListItem, Container, ListItemText, ListItemAvatar, Box, Divider, Avatar, ListItemSecondaryAction, Icon, Fab } from '@material-ui/core';
import Build from '@material-ui/icons/Build';
import DeleteIcon from '@material-ui/icons/Delete';


const Log = ({ log, selectLog, match, itemId, categoryId }) => {

  const formattedDate = moment(log.date_performed).format("MMM Do YYYY");

  const renderAdmin = category => (
    <Container >
      <Fab
        color="secondary"
        size="small"
        aria-label="Edit"
        // onClick={editCategoryClick}
      >
        <Icon>edit_icon</Icon>
      </Fab>
      <Fab
        color="primary"
        size="small"
        aria-label="Delete"
        // component={RouterLink}
        // to={`/item/${itemId}/category/${category.id}/delete`}
      >
        <DeleteIcon />
      </Fab>
    </Container>
  );
  
  return (
    <Box>
      <ListItem
        key={log.id}
        button
        // alignItems="flex-start"
        onClick={() => selectLog(log.id, itemId, categoryId)}
      >
        <ListItemAvatar>
          <Avatar>
            <Build />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={formattedDate} />
        <ListItemSecondaryAction>
          {renderAdmin(log)}
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
    </Box>
  )
}

export default Log