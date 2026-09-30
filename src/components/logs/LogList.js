import React from "react";
import { Link as RouterLink, useParams } from 'react-router';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import Tooltip from '@mui/material/Tooltip';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import ArrowBack from '@mui/icons-material/ArrowBack';
import { BottomButtons, StyledTypography } from './styles'
import Log from '../logs/Log';
import { useGetItemsQuery } from '../../store/api/maintenanceApi';

const LogList = () => {
  const params = useParams();
  const { item } = useGetItemsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      item: data && data.find(i => String(i.id) === String(params.itemId)),
    }),
  });
  const category = item && item.categories.find(c => String(c.id) === String(params.id));

  if (!item || !category) {
    return <h3>...Loading</h3>
  }

  const logs = item.logs.filter(log => (log.category_id === category.id))
  const renderList = logs.map(log => (
    <Log
      key={log.id}
      log={log}
      itemId={item.id}
      categoryId={category.id}
    />
  ));

  return (
    <Container>
      <StyledTypography variant="h2">
        {category.name} for {item.name}
      </StyledTypography>
      <List component="nav">{renderList}</List>
      <BottomButtons>
        <Fab
          color="secondary"
          aria-label="Back to Categories"
          size="small"
          to={`/item/${item.id}`}
          component={RouterLink}
        >
          <Tooltip title="Back to Categories">
            <ArrowBack />
          </Tooltip>
        </Fab>       
        <Fab 
          color="primary" 
          aria-label="Create New"
          size="small"
          to={`/item/${item.id}/category/${category.id}/log/new`}
          component={RouterLink}
        >
          <Tooltip title="Create New Log">
            <AddIcon />
          </Tooltip>
        </Fab>
      </BottomButtons>
    </Container>
  )

}

export default LogList;
