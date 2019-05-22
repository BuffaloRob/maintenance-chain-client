import React from 'react';
import { Link, Route } from 'react-router-dom';
import ItemShow from './ItemShow';
import Item from './Item';

const ItemList = ({ items, selectItem }) => {
  const renderList = Object.keys(items).map(item => (
    <Item
      item={items[item]}
      selectItem={selectItem}
    />
  ));

  return (
    <div>
      <h2 className='ui header'>Items</h2>
      <div className='ui celled list'>{renderList}</div>
      <div style={{ textAlign: 'right' }}>
        <Link to="/items/new" className='ui button primary'>
          Create New Item
        </Link>
      </div>
    </div>
  )
// const ItemList = ({ items }) => {
//   // debugger
//   const renderList = Object.keys(items).map(item => {
//     return (
//       <div className="item" key={items[item].id}>
//         <div className='right floated content'>
//           <Link className='ui button primary' to={`/items/edit/${items[item].id}`}>Edit</Link>
//           <Link className='ui button negative' to={`/items/delete/${items[item].id}`}>Delete</Link>
//         </div>
//         <i className="large middle aligned icon wrench" />
//         <Link to={`/items/${items[item].id}`}>{items[item].name}</Link>
//       {/* </div> */}
//       <Route path="/items/:id" render={props => <ItemShow {...props}
//         item={items[item]} />} />
//       </div>
//     )
//   });

  
//   const renderAdmin = (item) => {
//     // if (item.user.id === this.props.currentUserId) {
//     // if (this.props.isAuthenticated) {
//       return (
//         <div className='right floated content'>
//           <Link className='ui button primary' to={`/items/edit/${items[item].id}`}>Edit</Link>
//           <Link className='ui button negative' to={`/items/delete/${items[item].id}`}>Delete</Link>
//         </div>
//       )
//     // }
//   }

//  const renderCreate = () => {
//     // if (this.props.isAuthenticated) {
//       return (
//         <div style={{ textAlign: 'right' }}>
//           <Link to="/items/new" className='ui button primary'>
//             Create New Item
//           </Link>
//         </div>
//       )
//     // }
//   }

}

export default ItemList;

// import React from 'react';
// import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';

// import { fetchItems } from '../../actions/itemActions';
// import { fetchUser } from '../../actions/authActions';

// class ItemList extends React.Component {

//   componentDidMount() {
//     // this.props.fetchUser();
//     this.props.fetchItems();
//   }

  // renderAdmin(item) {
  //   // if (item.user.id === this.props.currentUserId) {
  //   if (this.props.isAuthenticated) {
  //     return (
  //       <div className='right floated content'>
  //         <Link className='ui button primary' to={`/items/edit/${item.id}`}>Edit</Link>
  //         <Link className='ui button negative' to={`/items/delete/${item.id}`}>Delete</Link>
  //       </div>
  //     )
  //   }
  // }

  // renderList() {
    // return this.props.items.map(item => {
    //   return ( 
    //     <div className="item" key={item.id}>
    //       {this.renderAdmin(item)}
    //       <i className="large middle aligned icon wrench" />
    //       <Link to={ `items/${item.id}` } className='content'>{item.name}</Link>
    //     </div>
    //   )
    // });
  // }
 
  // renderCreate() {
  //   if (this.props.isAuthenticated) {
  //     return (
  //       <div style={{ textAlign: 'right' }}>
  //         <Link to="/items/new" className='ui button primary'>
  //           Create New Item
  //         </Link>
  //       </div>
  //     )
  //   }
  // }

//   render() {
    // return (
    //   <div>
    //     <h2 className='ui header'>Items</h2>
    //     <div className='ui celled list'>{this.renderList()}</div>
    //     {this.renderCreate()}
    //   </div>
    // )
//   }
// }

// const mapStateToProps = (state) => {
//   return ({ 
//     items: Object.values(state.items),
//     currentUserId: state.auth.currentUser.user_id,
//     isAuthenticated: state.auth.isAuthenticated,
//   });
// }

// export default connect(mapStateToProps, { fetchItems, fetchUser })(ItemList);