import React from "react";
import { Link as RouterLink } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { BottomButtons, StyledTypography } from './styles'
import Log from '../logs/Log';
import { useGetItemsQuery } from '../../store/api/maintenanceApi';

const LogList = ({ match }) => {
  const { item } = useGetItemsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      item: data && data.find(i => String(i.id) === String(match.params.itemId)),
    }),
  });
  const category = item && item.categories.find(c => String(c.id) === String(match.params.id));

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
