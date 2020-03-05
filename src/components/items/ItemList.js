import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import List from "@material-ui/core/List";
import Container from "@material-ui/core/Container";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
import { v4 as uuidv4 } from 'uuid';
import { BottomButtons, StyledTypography } from './styles'

import Item from './Item';

const ItemList = ({ items, selectItem, deleteItemClick }) => {
  const renderList = Object.keys(items).map(item => (
    <Item
      key={uuidv4()}
      item={items[item]}
      selectItem={selectItem}
      deleteItemClick={deleteItemClick}
    />
  ));

  if (!items) {
    return <h3>...Loading</h3>
  }
  return (
    <Container>
      <StyledTypography variant="h2">
        Items
      </StyledTypography>
      <List component="nav">{renderList}</List>
      <BottomButtons>
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
      </BottomButtons>
    </Container>
  )
}

export default ItemList;
