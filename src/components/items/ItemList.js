import React from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';

import Item from './Item';
import { List, Container, Typography, Box, Divider, Button } from '@material-ui/core';

const ItemList = ({ items, selectItem, editItemClick }) => {

  const renderList = Object.keys(items).map(item => (
    <Item
      key={items[item].id}
      item={items[item]}
      selectItem={selectItem}
      // editItemClick={editItemClick}
    />
  ));

  if (!items) {
    return <h3>...Loading</h3>
  }
  return (
    <Container>
      <Typography variant="h4" >
        <Box textAlign="center">Items</Box>
        <Divider />
      </Typography>
      <List component="nav">{renderList}</List>
      <Box textAlign="left">
        <Button to="/item/new" component={RouterLink}>
          Create New Item
        </Button>
      </Box>
    </Container>
  )
}

export default withRouter(ItemList);
