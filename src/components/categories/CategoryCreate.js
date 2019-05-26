import React from "react";
import _ from 'lodash';
import { connect } from 'react-redux';

import { createCategory, fetchCategories } from '../../actions/categoryActions';
import CategoryForm from "./CategoryForm";

import { Field, reduxForm } from 'redux-form'

class CategoryCreate extends React.Component {

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
    const itemId = this.props.match.params.itemId
    this.props.createCategory(formValues, itemId);
  }

  render() {
    return (
      <>
        <h3>Make a New Category</h3>
        <form onSubmit={this.props.handleSubmit(this.onSubmit)} className='ui form error'>
          <Field
            name='category[name]'
            component={this.renderInput}
            label='Enter Category Name'
          />
          <button className='ui button primary'>Submit</button>
        </form>
      </>
    );
  }
}

const validate = formValues => {
  const errors = {};

  if (!formValues.name) {
    errors.name = "You Must Enter an Item Name"
  }

  return errors;
}

CategoryCreate = reduxForm({
  form: 'categoryForm',
  validate: validate
})(CategoryCreate);

export default connect(null, { createCategory })(CategoryCreate)

// import React from "react";
// import { connect } from 'react-redux';

// import CategoryForm from './CategoryForm';
// import { createCategory } from '../../actions/categoryActions';
// //need to import Connect() and wire up to action creator

// class CategoryCreate extends React.Component {

//   onSubmit = (formValues, itemId) => {
//     debugger
//     itemId = this.props.item.id;
//     this.props.createCategory(formValues, itemId);
//   }

//   render() {
//     return (
//       <div>
//         <h3>Create a New Category</h3>
//         <CategoryForm onSubmit={this.onSubmit} />
//       </div>
//     );
//   }
// }

// const mapStateToProps = (state, ownProps) => {
//   return {
//     item: state.items[ownProps.match.params.itemId]
//   }
// };


// export default connect(mapStateToProps, { createCategory })(CategoryCreate);

