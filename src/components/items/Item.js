import React from 'react';
import { Link } from 'react-router-dom';
import history from '../../history';
import { Route } from 'react-router-dom';
import ItemEdit from './ItemEdit';

const Item = ({ item, selectItem, editItemClick }) => {

  const renderAdmin = item => (

    <div className='right floated content'>
      <Link className='ui button primary' to={`/item/${item.id}/edit`}>Edit</Link>
      <Link className='ui button negative' to={`/item/${item.id}/delete`}>Delete</Link>
    </div>

  );
  
  
  return (
    
    <div className='item' key={item.id} >
      {renderAdmin(item)}
      <i className="large middle aligned wrench icon" />
        <h3 className='content' id={item.id} onClick={() => selectItem(item.id)}>{item.name}</h3>
    </div>
  )
}

export default Item