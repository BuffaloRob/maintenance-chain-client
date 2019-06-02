import React from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import { ListItem, Container, ListItemText, ListItemAvatar, Box, Divider, Avatar, ListItemSecondaryAction, Icon, Fab } from '@material-ui/core';
import Button from '@material-ui/core/Button'
import Build from '@material-ui/icons/Build';
import DeleteIcon from '@material-ui/icons/Delete';


const Category = ({ category, selectCategory, match, itemId, editCategoryClick }) => {
  const renderAdmin = category => (
    <Container >
      <Fab
        color="secondary"
        size="small"
        aria-label="Edit"
        onClick={editCategoryClick}
      >
        <Icon>edit_icon</Icon>
      </Fab>
      <Fab
        color="primary"
        size="small"
        aria-label="Delete"
        component={RouterLink}
        to={`/item/${itemId}/category/${category.id}/delete`}
      >
        <DeleteIcon />
      </Fab>
    </Container>
  );

  return (
    <Box>
      <ListItem 
        key={category.id} 
        button 
        // alignItems="flex-start"
        onClick={() => selectCategory(category.id, itemId)}
      >
        <ListItemAvatar>
          <Avatar>
            <Build />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={category.name} />
        <ListItemSecondaryAction>
          {renderAdmin(category)}
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
    </Box>
  )
}

export default withRouter(Category)