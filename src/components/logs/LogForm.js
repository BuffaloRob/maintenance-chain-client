import React from "react";
import { Field, reduxForm } from 'redux-form'

class LogForm extends React.Component {

  renderError({ error, touched }) {
    if (touched && error) {
      return <div className='header'>{error}</div>;
    }
  }

  renderInput = ({ input, label, type, meta }) => {
    const className = `field ui input ${meta.error && meta.touched ? 'error' : ''}`
    return <>
      <label>{label}</label>
      <div className={className}>
        <input {...input} type={type} autoComplete="off" placeholder={label} />
      </div>
      <div className='ui error message'>
        {this.renderError(meta)}
      </div>
    </>;
  }

  onSubmit = formValues => {
    this.props.onSubmit(formValues);
  }

  render() {
    return (
      // handleSubmit() comes from redux-forms
      <form onSubmit={this.props.handleSubmit(this.onSubmit)} className='ui form error'>
        <Field 
          name='log[date_performed]'
          type='date'
          component={this.renderInput} 
          label='Enter the date performed ' 
        /><br/>
        <Field 
          name='log[date_due]' 
          type='date'
          component={this.renderInput} 
          label='Enter the date due ' 
        /><br/>
        <Field 
          name='log[cost]' 
          type='number'
          component={this.renderInput} 
          label='Enter the cost $' 
        /><br/>
        <Field 
          name='log[notes]' 
          type='text'
          component={this.renderInput} 
          label='Enter any notes  ' 
        /><br/>
        <Field 
          name='log[tools]' 
          type='text'
          component={this.renderInput} 
          label='Enter the tools used ' 
        /><br/>
        {/* <Field
          name='log[categories]'
          type='hidden'
          value={this.props.match.params.id}
        /> */}
        <button className='ui button primary'>Submit</button>
      </form>
    );
  }
}

const validate = formValues => {
  const errors = {};

  // if (!formValues.logName) {
  //   errors.logName = "You Must Enter an Log Name"
  // }

  // return errors;
}

export default reduxForm({
  form: 'logForm',
  validate: validate
})(LogForm);
