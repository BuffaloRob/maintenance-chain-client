import React from 'react';
import { Link, Route } from 'react-router-dom';

import Category from '../categories/Category';

const ItemShow = ({ item, selectCategory, match, editCategoryClick }) => {
  const renderList = item.categories.map(category => (
    <Category 
      key={category.id}
      category={category}
      selectCategory={selectCategory}
      match={match}
      itemId={item.id}
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
      <div style={{ textAlign: 'right' }}>
        <Link to={`/item/${item.id}/category/new`} className='ui button primary'>
          Create New Category
        </Link>
      </div>
    </div>
  )

}

export default ItemShow;



// import React from "react";
// import { Link } from 'react-router-dom';
// import { connect } from "react-redux";

// import { fetchItem } from '../../actions/itemActions';
// import { fetchCategories } from '../../actions/categoryActions';

// //Refactor this into the CategoryList component
// class ItemShow extends React.Component {

//   componentDidMount() {
//     const itemId = this.props.match.params.id
//     this.props.fetchCategories(itemId)
//   }

//   renderAdmin(category) {
   
//     const itemId = this.props.match.params.id
//     //authenticating differenetly than in ItemList
//     if (this.props.isAuthenticated) {
//       return (
//         <div className='right floated content'>
//           <Link className='ui button primary' to={`/items/${itemId}/categories/edit/${category.id}`}>Edit</Link>
//           <Link className='ui button negative' to={`/items/${itemId}/categories/delete/${category.id}`}>Delete</Link>
//         </div>
//       )
//     }
//   }

  // renderList() {
  //   const itemId = parseInt(this.props.match.params.id)

  //   return this.props.categories.map(cat => {
  //     if (itemId === cat.item.id) {
  //       return (
  //         <div className='item' key={cat.id} >
  //           {this.renderAdmin(cat)}
  //           <i className='large middle aligned icon wrench' />
  //           <Link to={`/items/${itemId}/categories/${cat.id}`} className='content'>{cat.name}</Link>
  //         </div>
  //       )
  //     } 
  //   });
  // }

//   renderCreate() {
//     const itemId = this.props.match.params.id

//     if (this.props.isAuthenticated) {
//       return (
//         <div style={{ textAlign: 'right' }} >
//           <Link to={`/items/${itemId}/categories/new`} className='ui button primary'>Create New Category</Link>
//         </div>
//       )
//     }
//   }

//   render() {
//     return (
//       <div>
//         <h3>Maintenance Categories for {this.props.item.name}</h3>
//         <div className='ui celled list'>{this.renderList()}</div>
//         {this.renderCreate()}
//       </div>
//     )
//   }
// }

// const mapStateToProps = (state, ownProps) => {
//   return ({
//     item: state.items[ownProps.match.params.id],
//     categories: Object.values(state.categories),
//     isAuthenticated: state.auth.isAuthenticated
//   })
// }

// export default connect(mapStateToProps, { fetchItem, fetchCategories })(ItemShow);

// // get item :id from url params and use that to make list of categories for that item
