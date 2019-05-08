import React from "react";
import { connect } from 'react-redux';

import LogForm from './LogForm';
import { createLog } from '../../actions/logActions';
//need to import Connect() and wire up to action creator

class LogCreate extends React.Component {

  onSubmit = (formValues, itemId) => {
    itemId = this.props.match.params.id
    this.props.createLog(formValues);
  }

  render() {
    return (
      <div>
        <h3>Create a New Item to Track</h3>
        <LogForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default connect(null, { createLog })(LogCreate);
