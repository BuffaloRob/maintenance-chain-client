import React from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchLog, deleteLog } from '../../actions/logActions';
import Modal from '../Modal';
import history from '../../history';


class LogDelete extends React.Component {

  componentDidMount() {
    // this.props.fetchCategory(this.props.match.params.id);
  }

  renderActions() {
    const { id, itemId } = this.props.match.params;
    return (
      <>
        <button onClick={() => this.props.deleteLog(id, itemId)} className='ui button negative'>Delete</button>
        <Link to={`/items/${itemId}/logs/${id}`} className='ui button'>Cancel</Link>
      </>
    );
  }

  renderContent() {
    if (!this.props.category) {
      return 'Are you sure you want to delete this Log?'
    }

    return `Are you sure you want to delete the Log: ${this.props.log.date_performed}?`
  }

  render() {
    const { id, itemId } = this.props.match.params;
    return (
      <Modal
        title='Delete Log'
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push(`/items/${itemId}/logs/${id}`)}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { log: state.categories[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchLog, deleteLog })(LogDelete);
