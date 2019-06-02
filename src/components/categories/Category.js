import React from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import { ListItem, Container, ListItemText, ListItemAvatar, Box, Divider, Avatar, ListItemSecondaryAction } from '@material-ui/core';
import Button from '@material-ui/core/Button'
import Build from '@material-ui/icons/Build';

const Category = ({ category, selectCategory, match, itemId, editCategoryClick }) => {
  const renderAdmin = category => (
    <Container >
      <Button component={RouterLink} to={`/item/${itemId}/category/${category.id}/edit`}>Edit</Button>
      <Button component={RouterLink} to={`/item/${itemId}/category/${category.id}/delete`}>Delete</Button>
    </Container>
    
    //   <button className='ui button primary' onClick={() => editCategoryClick(category.id, itemId)}>Edit</button>
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