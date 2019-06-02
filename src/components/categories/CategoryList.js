import React from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import { List, Container, Typography, Box, Divider, Button } from '@material-ui/core';

import Category from './Category';

const CategoryList = ({ item, selectCategory, match, editCategoryClick, location, history }) => {
  console.log('CategoryList render')
  
  const renderList = item.categories.map(category => (
    <Category
      key={category.id}
      category={category}
      selectCategory={selectCategory}
      match={match}
      history={history}
      itemId={item.id}
      location={location}
      editCategoryClick={editCategoryClick}
    />
  ));

  if (!item) {
    return <h3>...Loading</h3>
  }
  return (
    <Container>
      <Typography variant="h4">
        <Box textAlign="center">Maintenance Categories for {item.name}</Box>
        <Divider />
      </Typography>
      <List component="nav">{renderList}</List>
      <Box textAlign="left">
        <Button to={`/items`} component={RouterLink}>
          Back to List of Items
        </Button>
        <Button to={`/item/${item.id}/category/new`} component={RouterLink}>
          Create New Category
        </Button>    
      </Box>
    </Container>
  )

}

export default withRouter(CategoryList);