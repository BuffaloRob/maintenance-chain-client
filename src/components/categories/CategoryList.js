import React from 'react';
import { Link as RouterLink, useParams } from 'react-router';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import Tooltip from '@mui/material/Tooltip';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import ArrowBack from '@mui/icons-material/ArrowBack';
import { BottomButtons, StyledTypography } from './styles'
import Category from './Category';
import RecordStatus from '../common/RecordStatus';
import { useItem } from '../../store/api/lookups';

const CategoryList = () => {
  const params = useParams();
  const { item, isLoading, error } = useItem(params.id);

  if (!item) {
    return <RecordStatus isLoading={isLoading} error={error} what="item" backTo="/items" backLabel="Back to items" />;
  }

  const renderList = item.categories.map(category => (
    <Category
      key={category.id}
      category={category}
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