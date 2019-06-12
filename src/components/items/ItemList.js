import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import { List, Container, Typography, Box, Divider, Fab, Tooltip, CircularProgress } from '@material-ui/core';

import Item from './Item';

const ItemList = ({ items, selectItem, deleteItemClick , isFetching }) => {

  const renderList = Object.keys(items).map(item => (
    <Item
      key={items[item].id}
      item={items[item]}
      selectItem={selectItem}
      deleteItemClick={deleteItemClick}
    />
  ));

  if (isFetching) {
    return (
      <Box textAlign='center'>
        <br/>
        <br/>
        <CircularProgress />
      </Box>
    )
  }
  return (
    <Container>
      <Typography variant="h4" >
        <Box textAlign="center">Items</Box>
        <Divider />
      </Typography>
      <List component="nav">{renderList}</List>
      <Box textAlign="left">
        <Fab
          color="primary"
          aria-label="Create New Item"
          size="small"
          to={`/item/new`}
          component={RouterLink}
        >
          <Tooltip title="Create New Item">
            <AddIcon />
          </Tooltip>
        </Fab>  
      </Box>
    </Container>
  )
}

export default ItemList;
