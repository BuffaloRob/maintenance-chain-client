import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import Item from './Item';
import { List, Container, Typography, Box, Divider, Button } from '@material-ui/core';

const ItemList = ({ items, selectItem, editItemClick }) => {

  const renderList = Object.keys(items).map(item => (
    <Item
      key={items[item].id}
      item={items[item]}
      selectItem={selectItem}
      // editItemClick={editItemClick}
    />
  ));

  if (!items) {
    return <h3>...Loading</h3>
  }
  return (
    <Container>
      <Typography variant="h4" >
        <Box textAlign="center">Items</Box>
        <Divider />
      </Typography>
      <List component="nav">{renderList}</List>
      <Box textAlign="right">
        <Button to="/item/new" className='ui button primary'>
          Create New Item
        </Button>
      </Box>
    </Container>
  )
}

export default withRouter(ItemList);

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