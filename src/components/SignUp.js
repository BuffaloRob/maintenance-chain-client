import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { signup } from '../actions';

class SignUp extends React.Component {
  state = {
    name: "",
    email: "",
    password: ""
  };

  // handleChange = event => {
  //   const { name, value } = event.target;
  //   this.setState({
  //     [name]: value
  //   });
  // }

  // handleSubmit = event => {
  //   event.preventDefault();
  //   if (this.props.signup(this.state)) {
  //     this.props.history.push('/')
  //     window.alert("Thanks for signing up")
  //   } else {
  //     window.alert("We're having issues signing ypu up")
  //   }
  // }
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
    console.log(meta);
    const className = `field ${meta.error && meta.touched ? 'error' : ''}`
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autocomplete='off' />
        {this.renderError(meta)}
      </div>
    )
  }

  onSubmit = formValues => {
    this.props.onSubmit(formValues);
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className='ui form error'>
        <h3>Sign Up</h3>
        <Field name='name' component={this.renderInput} label='Enter Your Name' />
        <Field name='email' component={this.renderInput} label='Enter Your Email'/>
        <Field name='password' component={this.renderInput} label='Enter Your Password'/>
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

const formWrapped = reduxForm({ 
  form: 'signup',
  validate
})(SignUp);

export default connect(null, { signup })(formWrapped);
  