import React from "react";
import { Link as RouterLink } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import Divider from '@material-ui/core/Divider';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import ArrowBack from '@material-ui/icons/ArrowBack';

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
      <Typography variant="h4">
        <Box textAlign="center">Logs for {category[0].name}</Box>
        <Divider />
      </Typography>
      <List component="nav">{renderList}</List>
      <Box textAlign="left">
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
      </Box>
    </Container>
  )

}

export default LogList;
