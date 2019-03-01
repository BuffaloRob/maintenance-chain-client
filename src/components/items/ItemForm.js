import React from "react";
import { Field, reduxForm } from 'redux-form'

class ItemForm extends React.Component {

  renderError({ error, touched }) {
    if (touched && error) {
      return <div className='header'>{error}</div>;
    }
  }

  renderInput = ({ input, label, meta }) => {
    const className = `field ui input ${meta.error && meta.touched ? 'error' : ''}`
    return <>
        {/* <label>{label}</label> */}
        <div className={className}>
          <input {...input} autoComplete="off" placeholder={label} />     
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
        <Field name='name' component={this.renderInput} label='Enter an Item Name' />
        <button className='ui button primary'>Submit</button>
      </form>
    );
  }
}

const validate = formValues => {
  const errors = {};

  if (!formValues.itemName) {
    errors.itemName = "You Must Enter an Item Name"
  }

  return errors;
}

export default reduxForm({
  form: 'itemForm',
  validate: validate
})(ItemForm);
