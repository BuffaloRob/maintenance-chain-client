import React from "react";
import _ from 'lodash';
import { connect } from 'react-redux';

import { editLog } from '../../actions/logActions';
import LogForm from "./LogForm";

class LogEdit extends React.Component {

  componentDidMount() {
    // this.props.fetchItem(this.props.match.params.id);
  }

  onSubmit = formValues => {
    const itemId = this.props.match.params.itemId
    this.props.editLog(formValues, this.props.match.params.id, itemId);
  }

  render() {
    if (!this.props.log) {
      return <div>Loading...</div>
    }

    return (
      <div>
        <h3>Edit {this.props.log.date_performed}</h3>
        <LogForm
          onSubmit={this.onSubmit}
        // initialValues={_.pick(this.props.item, 'name')}
        />
      </div>
    )
  }

}


const mapStateToProps = (state, ownProps) => {
  return {
    log: state.logs[ownProps.match.params.id]
  };
}

export default connect(mapStateToProps, { editLog })(LogEdit);
