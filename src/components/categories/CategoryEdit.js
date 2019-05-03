import React from "react";
import _ from 'lodash';
import { connect } from 'react-redux';

import { editCategory } from '../../actions/categoryActions';
import CategoryForm from "./CategoryForm";

class CategoryEdit extends React.Component {

  componentDidMount() {
    // this.props.fetchItem(this.props.match.params.id);
  }

  onSubmit = formValues => {
    const itemId = this.props.match.params.itemId
    this.props.editCategory(formValues, this.props.match.params.id, itemId );
  }

  render() {
    if (!this.props.category) {
      return <div>Loading...</div>
    }

    return (
      <div>
        <h3>Edit {this.props.category.name}</h3>
        <CategoryForm
          onSubmit={this.onSubmit}
        // initialValues={_.pick(this.props.item, 'name')}
        />
      </div>
    )
  }

}


const mapStateToProps = (state, ownProps) => {
  return {
    category: state.categories[ownProps.match.params.id]
  };
}

export default connect(mapStateToProps, { editCategory })(CategoryEdit);
