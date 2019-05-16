import React from "react";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import moment from 'moment';

import { fetchItem } from '../../actions/itemActions';
import { fetchLog } from '../../actions/logActions';

//Refactor this into the CategoryList component
class LogShow extends React.Component {

  componentDidMount() {
    const logId = this.props.match.params.id
    this.props.fetchLog(logId)
  }

  renderAdmin(log) {
    const itemId = this.props.match.params.itemId
    const catId = this.props.match.params.catId

    if (this.props.isAuthenticated) {
      return (
        <div className='right floated content'>
          <Link className='ui button primary' to={`/items/${itemId}/categories/${catId}/logs/edit/${log.id}`}>Edit</Link>
          <Link className='ui button negative' to={`/items/${itemId}/categories/${catId}/logs/delete/${log.id}`}>Delete</Link>
        </div>
      )
    }
  }

  renderList() {
    const logId = parseInt(this.props.match.params.id)
    const log = this.props.log
    const formattedDatePerformed = moment(log.date_performed).format("MMM Do YYYY");
    const formattedDateDue = moment(log.date_due).format("MMM Do YYYY");

    if (logId === log.id) {
      return (
        <div className='ui celled grid' key={log.id} >
          <div className='row'>
            <div className='three wide column'>
              <i class="hourglass start icon" />
              Performed On:
            </div>
            <div className='thirteen wide column'>{formattedDatePerformed}</div>
          </div> 
          <div className='row'>
            <div className='three wide column'>
              <i class="hourglass end icon" />
              Due On:
            </div>
            <div className='thirteen wide column'>{formattedDateDue}</div>
          </div>
          <div className='row'>
            <div className='three wide column'>
              <i class="dollar sign icon" />
              Cost:
            </div>
            <div className='thirteen wide column'>$ {log.cost}</div>
          </div>
          <div className='row'>
            <div className='three wide column'>
              <i className='wrench icon' />
              Tools Used:
            </div>
            <div className='thirteen wide column'>{log.tools}</div>
          </div>
          <div className='row'>
            <div className='three wide column'>
              <i className='pencil icon' />
              Notes:
            </div>
            <div className='thirteen wide column'>{log.notes}</div>
          </div>

        </div>
      )
    };
  }

  render() {
    return (
      <div>
        <h2 className='ui header'>Maintenance Log</h2>
        <div>{this.renderList()}</div>
        <div>{this.renderAdmin(this.props.log)}</div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return ({
    item: state.items[ownProps.match.params.itemId],
    log: state.logs[ownProps.match.params.id],
    isAuthenticated: state.auth.isAuthenticated
  })
}

export default connect(mapStateToProps, { fetchItem, fetchLog })(LogShow);
