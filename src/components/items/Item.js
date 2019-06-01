import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import history from '../../history';
import { Route } from 'react-router-dom';
import ItemEdit from './ItemEdit';
import { ListItem, Container, ListItemText, ListItemAvatar, Box, Divider, Avatar, ListItemSecondaryAction } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button'
import Build from '@material-ui/icons/Build';


const Item = ({ item, selectItem, editItemClick }) => {

  const renderAdmin = item => (

    <Container >
      <Button component={RouterLink} to={`/item/${item.id}/edit`}>Edit</Button>
      <Button component={RouterLink} to={`/item/${item.id}/delete`}>Delete</Button>
    </Container>

  );
    
  return (
    <Box>
      <ListItem key={item.id} button onClick={() => selectItem(item.id)}>
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