import React from "react";
import _ from 'lodash';
import { connect } from 'react-redux';

import { editCategory, fetchCategories } from '../../actions/categoryActions';
import CategoryForm from "./CategoryForm";

import { Field, reduxForm } from 'redux-form'

class CategoryEdit extends React.Component {

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
    const catId = this.props.match.params.id
    this.props.editCategory(formValues, catId , itemId);
  }

  render() {
    return (
      <>
      <h3>Edit {this.props.category.name}</h3>
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

CategoryEdit = reduxForm({
  form: 'categoryForm',
  validate: validate
})(CategoryEdit);

export default connect(null, { editCategory })(CategoryEdit)

///////
// const CategoryEdit = ({ category, match }) => {
//   const onSubmit = formValues => {
//     const itemId = match.params.itemId
//     this.props.editCategory(formValues, match.params.id, itemId);
//   }

  
//     // if (!this.props.category) {
//     //   return <div>Loading...</div>
//     // }
//   return ( 
//     <div>
//       <h3>Edit {category.name}</h3>
//       <CategoryForm
//         onSubmit={onSubmit}
//         // initialValues={_.pick(this.props.item, 'name')}
//       />
//     </div>
//   )

// }

// export default connect(null, { editCategory })(CategoryEdit)
////////
// class CategoryEdit extends React.Component {

//   // componentDidMount() {
//   //   this.props.fetchCategories(this.props.match.params.itemId)
//   // }

  // onSubmit = formValues => {
  //   const itemId = this.props.match.params.itemId
  //   debugger
  //   this.props.editCategory(formValues, this.props.match.params.id, itemId );
  // }

//   render() {
//     if (!this.props.category) {
//       return <div>Loading...</div>
//     }
//     return (
//       <div>
//         <h3>Edit {this.props.category.name}</h3>
//         <CategoryForm
//           onSubmit={this.onSubmit}
//           initialValues={_.pick(this.props.item, 'name')}
//         />
//       </div>
//     )
//   }

// }

// const mapStateToProps = (state, ownProps) => {
//   return {
//     category: state.categories[ownProps.match.params.id]
//   };
// }

// export default connect(null, { editCategory })(CategoryEdit);
