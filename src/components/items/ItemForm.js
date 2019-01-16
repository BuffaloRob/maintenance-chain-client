import React from "react";
import { Field, reduxForm } from 'redux-form'

class ItemForm extends React.Component {

  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div>
          <div>{error}</div>
        </div>
      )
    }
  }

  renderInput = ({ input, label, meta }) => {
    return (
      <div>
        <label>{label}</label>
        <input {...input} autoComplete='off' />
        {this.renderError(meta)}
      </div>
    )
  }

  onSubmit = formValues => {
    this.props.onSubmit(formValues);
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
        <Field name='itemName' component={this.renderInput} label='Enter a New Item Name' />
        <button>Submit</button>
      </form>
    );
  }
}

const validate = formValues => {
  const errors = {};

  if (!formValues.itemName) {
    errors.itemName = "You Must Enter an Item Name to Make a New Item"
  }

  return errors;
}

export default reduxForm({
  form: 'itemForm',
  validate: validate
})(ItemForm);
