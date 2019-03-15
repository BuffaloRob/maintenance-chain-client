import React from 'react';
import { connect } from 'react-redux';

class Welcome extends React.Component {
  renderName() {
    if (this.props.isAuthenticated) {
      return (
        <p>Welcome {this.props.currentUser}</p>
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

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    currentUser: state.auth.currentUser.email
  }
}

export default connect(mapStateToProps, {})(Welcome);