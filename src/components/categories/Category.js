import React from 'react';
import { Link } from 'react-router-dom';

const Category = ({ category, selectCategory, match, itemId }) => {

  const renderAdmin = item => (
    <div className='right floated content'>
      <Link className='ui button primary' to={`/item/${item.id}/category/${category.id}/edit`}>Edit</Link>
      <Link className='ui button negative' to={`/item/${item.id}/category/${category.id}/delete`}>Delete</Link>
    </div>
  );

  return (
    <div className='item' key={category.id} >
      {renderAdmin(category)}
      <i className="large middle aligned wrench icon" />
      <h3 className='content' id={category.id} onClick={() => selectCategory(category.id, itemId)}>{category.name}</h3>
    </div>
  )
}

export default Category