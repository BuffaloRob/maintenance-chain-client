import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { login } from '../actions/authActions';

class Login extends React.Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className='ui error message'>
          <div className='header'>{error}</div>
        </div>
      );
    }
  }

  renderInput = ({ input, label, type, meta }) => {
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} type={type} autoComplete='off' />
        {this.renderError(meta)}
      </div>
    )
  }

  onSubmit = formValues => {
    this.props.login(formValues, () => this.props.history.push("/"));
  }

  render() {
    return (
      // handleSubmit comes from reduxForm
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className='ui form error'>
        <h3>Log In</h3>
        <Field 
          name='email' 
          type='email' 
          component={this.renderInput} 
          label='Enter Your Email'
         />
        <Field 
          name='password' 
          type='password' 
          component={this.renderInput} 
          label='Enter Your Password'
         />
        <button className='ui button primary'>Submit</button>
      </form>
    )
  }

}

const validate = formValues => {
  const errors = {};

  if (!formValues.email) {
    errors.email = "You must enter an email address";
  }
  if (!formValues.password) {
    errors.password = "You must enter a password";
  }
  return errors;
}

const formWrapped = reduxForm({
  form: 'login',
  validate
})(Login);

export default connect(null, { login })(formWrapped);