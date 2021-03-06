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

const LogList = ({ category, selectLog, match, item, deleteLogClick, editLogClick }) => {
  
  const logs = item.logs.filter(log => (log.category_id === category[0].id))
  const renderList = logs.map(log => (
    <Log
      key={log.id}
      log={log}
      itemId={item.id}
      selectLog={selectLog}
      match={match}
      categoryId={category.id}
      deleteLogClick={deleteLogClick}
      editLogClick={editLogClick}
    />
  ));

  return (
    <Container>
      <StyledTypography variant="h2">
        {category[0].name} for {item.name}
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
          to={`/item/${item.id}/category/${category[0].id}/log/new`}
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
