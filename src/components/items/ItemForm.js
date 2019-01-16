import React from "react";
import { Field, reduxForm } from 'redux-form'

class ItemForm extends React.Component {

  renderInput = ({ input, label }) => {
    return (
      <div>
        <label>{label}</label>
        <input {...input} autoComplete='off' />
      </div>
    )
  }

  render() {
    return (
      <form>
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
