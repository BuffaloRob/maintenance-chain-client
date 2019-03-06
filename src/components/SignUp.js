import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { signup } from '../actions/authActions';

class SignUp extends React.Component {

  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className='ui error message'>
          <div className='header'>{error}</div>
        </div>
      );
    }
  }

  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete='off' />
        {this.renderError(meta)}
      </div>
    )
  }

  onSubmit = formValues => {
    this.props.signup(formValues);
  }

  render() {
    return (
      // handleSubmit comes from reduxForm
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className='ui form error'>
        <h3>Sign Up</h3>
        <Field name='name' component={this.renderInput} label='Enter Your Name' />
        <Field name='email' component={this.renderInput} label='Enter Your Email'/>
        <Field name='password' type='password' component={this.renderInput} label='Enter Your Password'/>
        <button className='ui button primary'>Submit</button>
      </form>
    )
  }

}

const validate = formValues => {
  const errors = {};
  if (!formValues.name) {
    errors.name = "You must enter a name";
  }
  if (!formValues.email) {
    errors.email = "You must enter an email address";
  }
  if (!formValues.password) {
    errors.password = "You must enter a password";
  }
  return errors;
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isAuthenticating: state.auth.isAuthenticating,
    currentUser: state.auth.currentUser,
    token: state.auth.token
  }
}

const formWrapped = reduxForm({ 
  form: 'signup',
  validate
})(SignUp);

export default connect(mapStateToProps, { signup })(formWrapped);
  