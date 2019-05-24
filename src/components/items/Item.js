import React from 'react';
import { Link } from 'react-router-dom';

const Item = ({ item, selectItem }) => {

  const renderAdmin = item => (
    <div className='right floated content'>
      <Link className='ui button primary' to={`/items/edit/${item.id}`}>Edit</Link>
      <Link className='ui button negative' to={`/items/delete/${item.id}`}>Delete</Link>
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