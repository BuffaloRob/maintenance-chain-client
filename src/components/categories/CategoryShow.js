import React from "react";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import moment from 'moment';

import { fetchLogs } from '../../actions/logActions';
import { fetchCategories } from '../../actions/categoryActions';
// Refactor this into the LogList component

class CategoryShow extends React.Component {
  
  componentDidMount() {
    const itemId = this.props.match.params.itemId
    const catId = this.props.match.params.id;  
    this.props.fetchCategories(catId, itemId)  
    this.props.fetchLogs( catId, itemId);
  }

  renderAdmin(log) {
    const itemId = this.props.match.params.itemId

    if (this.props.isAuthenticated) {
      return (
        <div className='right floated content'>
          <Link className='ui button primary' to={`/items/${itemId}/logs/edit/${log.id}`}>Edit</Link>
          {/* <Link className='ui button negative' to={`/items/${itemId}/logs/delete/${log.id}`}>Delete</Link> */}
        </div>
      )
    }
  }

  renderList() {
    const catId = parseInt(this.props.match.params.id)
    const itemId = this.props.match.params.itemId;

    return this.props.logs.map(log => {
      const formattedDate = moment(log.date_performed).format("MMM Do YYYY");
      if (catId === log.category.id) {        
        return (
          <div className='item' key={log.id} >
            {this.renderAdmin(log)}
            <i className='large middle aligned icon wrench' />           
            <Link to={`/items/${itemId}/logs/${log.id}`} className='content'>{formattedDate}</Link>
          </div>
        )
      }
    });
  }

  renderCreate() {
    const itemId = this.props.match.params.itemId;
    const catId = this.props.match.params.id; 

    if (this.props.isAuthenticated) {
      return (
        <div style={{ textAlign: 'right' }} >
          <Link to={`/items/${itemId}/categories/${catId}/logs/new`} className='ui button primary'>Create New Log</Link>
        </div>
      )
    }
  }

  render() {
    const catName = this.props.category.name

    return (
      <div>
        <h2 className='ui header'>Maintenance Logs for {catName}</h2>
        <div className='ui celled list'>{this.renderList()}</div>
        {this.renderCreate()}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {  
  return ({
    category: state.categories[ownProps.match.params.id],
    logs: Object.values(state.logs),
    isAuthenticated: state.auth.isAuthenticated
  })
}

export default connect(mapStateToProps, { fetchLogs, fetchCategories })(CategoryShow);


 // // catArray returns an array of category objects for that item but only the one that matches the URL catId will have info, the rest will be empty objects
    // const catArray = this.props.categories.map(cat => {
    //   if (cat.id === parseInt(this.props.match.params.id)) {
    //     return cat
    //   }
    // })
    // // filteredArray removes any empty objects from catArray
    // const filteredArray = catArray.filter(cat => cat);
    // // catName & catId pull the info from the only object in filteredArray
    // const catName = filteredArray[0].name;
    // const catId = parseInt(filteredArray[0].id);
