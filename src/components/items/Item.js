import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import history from '../../history';
import { Route } from 'react-router-dom';
import ItemEdit from './ItemEdit';
import { ListItem, Container, ListItemText, ListItemAvatar, Box, Divider, Avatar, ListItemSecondaryAction, Fab, Icon } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button'
import Build from '@material-ui/icons/Build';
import DeleteIcon from '@material-ui/icons/Delete';


const Item = ({ item, selectItem, editItemClick }) => {

  const renderAdmin = item => (

    <Container >
      <Fab 
        color="secondary" 
        size="medium"
        aria-label="Edit" 
        component={RouterLink} 
        to={`/item/${item.id}/edit`}
      >
        <Icon>edit_icon</Icon>
      </Fab>
      <Fab
        color="primary"
        size="medium"
        aria-label="Delete"
        component={RouterLink}
        to={`/item/${item.id}/delete`}
      >
        <DeleteIcon />
      </Fab>
    </Container>

  );
    
  return (
    <Box>
      <ListItem 
        key={item.id} 
        button 
        // alignItems="flex-start"
        onClick={() => selectItem(item.id)}
      >
        <ListItemAvatar>
          <Avatar>
            <Build />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={item.name} />
        <ListItemSecondaryAction>
          {renderAdmin(item)}
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
    </Box>
  )
}

export default Item