import React from 'react';
import { connect } from 'react-redux'

import { fetchPastDue } from '../actions/queryActions'


class PastDue extends React.Component {

  componentDidMount() {
    this.props.fetchPastDue();
  }

  renderList() {
    return this.props.logs.map(log => {
      return (
        <div className='item' key={log.id}>
          {log.date_performed}
        </div>
      )
    })
  }
  
  render() {
    return (
      <div>
        <h3>Past Due</h3>
        <div className='ui celled list'>{this.renderList()}</div>
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    logs: Object.values(state.query),
  }
}

export default connect(mapStateToProps, { fetchPastDue })(PastDue);