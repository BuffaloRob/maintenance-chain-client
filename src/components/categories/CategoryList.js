import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { BottomButtons, StyledTypography } from './styles'
import Category from './Category';
import { useGetItemsQuery } from '../../store/api/maintenanceApi';

const CategoryList = ({ selectCategory, match }) => {
  const { item } = useGetItemsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      item: data && data.find(i => String(i.id) === String(match.params.id)),
    }),
  });

  if (!item) {
    return <h3>...Loading</h3>
  }

  const renderList = item.categories.map(category => (
    <Category
      key={category.id}
      category={category}
      selectCategory={selectCategory}
      itemId={item.id}
    />
  ));

  return (
    <Container>
      <StyledTypography variant="h2">
        {item.name}
      </StyledTypography>
      <List component="nav">{renderList}</List>
      <BottomButtons>
        <Fab
          color="secondary"
          aria-label="Back to Categories"
          size="small"
          to={`/items`}
          component={RouterLink}
        >
          <Tooltip title="Back to Items">
            <ArrowBack />
          </Tooltip>
        </Fab>
        <Fab
          color="primary"
          aria-label="Create New"
          size="small"
          to={`/item/${item.id}/category/new`}
          component={RouterLink}
        >
          <Tooltip title="Create New Category">
            <AddIcon />
          </Tooltip>
        </Fab>   
      </BottomButtons>
    </Container>
  )

}

export default CategoryList;