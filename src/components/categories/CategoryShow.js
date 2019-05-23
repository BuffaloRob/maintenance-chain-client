import React from "react";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import moment from 'moment';

import Log from '../logs/Log';

import { fetchLogs } from '../../actions/logActions';
import { fetchCategories } from '../../actions/categoryActions';
// Refactor this into the LogList component

const CategoryShow = ({ category, selectLog, match }) => {
  debugger
  const renderList = category.logs.map(log => (
    <Log
      key={log.id}
      log={log}
      selectLog={selectLog}
      match={match}
    />
  ));

  return (
    <div>
      <h2>Logs for {category.name}</h2>
      <div className='ui celled list'>{renderList}</div>
    </div>
  )
}

export default CategoryShow;

// class CategoryShow extends React.Component {
  
//   componentDidMount() {
//     const itemId = this.props.match.params.itemId
//     const catId = this.props.match.params.id;  
//     this.props.fetchCategories(catId, itemId)  
//     this.props.fetchLogs( catId, itemId);
//   }

//   renderAdmin(log) {
//     const itemId = this.props.match.params.itemId

//     if (this.props.isAuthenticated) {
//       return (
//         <div className='right floated content'>
//           <Link className='ui button primary' to={`/items/${itemId}/logs/edit/${log.id}`}>Edit</Link>
//           {/* <Link className='ui button negative' to={`/items/${itemId}/logs/delete/${log.id}`}>Delete</Link> */}
//         </div>
//       )
//     }
//   }

//   renderList() {
//     const catId = parseInt(this.props.match.params.id)
//     const itemId = this.props.match.params.itemId;

//     return this.props.logs.map(log => {
//       const formattedDate = moment(log.date_performed).format("MMM Do YYYY");
//       if (catId === log.category.id) {        
        // return (
        //   <div className='item' key={log.id} >
        //     {this.renderAdmin(log)}
        //     <i className='large middle aligned icon wrench' />           
        //     <Link to={`/items/${itemId}/logs/${log.id}`} className='content'>{formattedDate}</Link>
        //   </div>
        // )
//       }
//     });
//   }

//   renderCreate() {
//     const itemId = this.props.match.params.itemId;
//     const catId = this.props.match.params.id; 

//     if (this.props.isAuthenticated) {
//       return (
//         <div style={{ textAlign: 'right' }} >
//           <Link to={`/items/${itemId}/categories/${catId}/logs/new`} className='ui button primary'>Create New Log</Link>
//         </div>
//       )
//     }
//   }

//   render() {
//     const catName = this.props.category.name

//     return (
//       <div>
//         <h2 className='ui header'>Maintenance Logs for {catName}</h2>
//         <div className='ui celled list'>{this.renderList()}</div>
//         {this.renderCreate()}
//       </div>
//     )
//   }
// }

// const mapStateToProps = (state, ownProps) => {  
//   return ({
//     category: state.categories[ownProps.match.params.id],
//     logs: Object.values(state.logs),
//     isAuthenticated: state.auth.isAuthenticated
//   })
// }

// export default connect(mapStateToProps, { fetchLogs, fetchCategories })(CategoryShow);
