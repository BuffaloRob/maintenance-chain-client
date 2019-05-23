import React from 'react';

const Category = ({ category, selectCategory, match }) => {
  const itemId = match.params.id
  return (
    <div className='item' key={category.id} id={category.id} onClick={() => selectCategory(category.id, itemId)}>
      <i className="large middle aligned wrench icon" />
      <h3 className='content' id={category.id} >{category.name}</h3>
    </div>
  )
}

export default Category