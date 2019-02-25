import React from 'react';
import { connect } from 'react-redux';

class Welcome extends React.Component {
  renderName() {
    if (this.props.isAuthenticated) {
      return (
        <p>Welcome User</p>
      )
    } else {
      return (
        <p>Please sign up or log in</p>
      )
    }
  }

  render() {
    return (
      <div className='item'>
        {this.renderName()}
      </div>
    )
  }

}

export default Welcome;