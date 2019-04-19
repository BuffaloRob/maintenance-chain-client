import React from "react";
import { connect } from 'react-redux';

import CategoryForm from './CategoryForm';
import { createCategory } from '../../actions/categoryActions';
//need to import Connect() and wire up to action creator

class CategoryCreate extends React.Component {

  onSubmit = formValues => {
    this.props.createCategory(formValues);
  }

  render() {
    return (
      <div>
        <h3>Create a New Category</h3>
        <CategoryForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default connect(null, { createCategory })(CategoryCreate);
