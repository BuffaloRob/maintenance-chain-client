import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import Category from './Category';

const CategoryList = ({ item, selectCategoryId, match, editCategoryClick, location, history }) => {
  console.log('CategoryList render')
  
  const renderList = item.categories.map(category => (
    <Category
      key={category.id}
      category={category}
      selectCategoryId={selectCategoryId}
      match={match}
      history={history}
      itemId={item.id}
      location={location}
      editCategoryClick={editCategoryClick}
    />
  ));

  if (!item) {
    return <h3>...Loading</h3>
  }
  return (
    <div>
      <h3>Maintenance Categories for {item.name}</h3>
      <div className='ui celled list'>{renderList}</div>
      <div>
        <Link to={`/items`} className='ui button primary' >
          Back to List of Items
        </Link>
        <Link to={`/item/${item.id}/category/new`} className='ui button primary' >
          Create New Category
        </Link>
      </div>
    </div>
  )

}

export default withRouter(CategoryList);