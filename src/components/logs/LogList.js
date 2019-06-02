import React from "react";
import { Link as RouterLink } from 'react-router-dom';
import { List, Container, Typography, Box, Divider, Button } from '@material-ui/core';

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
        <Button to={`/item/${item.id}`} component={RouterLink}>
          Back to Categories
        </Button>
        <Button to={`/item/${item.id}/category/${category[0].id}/log/new`}  component={RouterLink}>
          Create New Log
        </Button>
      </Box>
    </Container>
  )

}

export default LogList;
