import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import history from '../../history';
import { Route } from 'react-router-dom';
import ItemEdit from './ItemEdit';
import { ListItem, Container, ListItemText, ListItemAvatar } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button'
// import WorkIcon from '@material-ui/icons/Work';


const Item = ({ item, selectItem, editItemClick }) => {

  const renderAdmin = item => (

    <Container>
      <Link varient="button" component={RouterLink} to={`/item/${item.id}/edit`}>Edit</Link>
      <Link component={RouterLink} to={`/item/${item.id}/delete`}>Delete</Link>
    </Container>

  );
    
  return (
    <ListItem key={item.id} >
      {/* <ListItemAvatar>
        <WorkIcon />
      </ListItemAvatar> */}
        {/* <h3 className='content' id={item.id} onClick={() => selectItem(item.id)}>{item.name}</h3> */}
      <Button id={item.id} onClick={() => selectItem(item.id)}>{item.name}</Button>
      {renderAdmin(item)}
    </ListItem>
  )
}

export default Item