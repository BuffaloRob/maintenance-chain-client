import React from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchCategory, deleteCategory } from '../../actions/categoryActions';
import Modal from '../Modal';
import history from '../../history';


class CategoryDelete extends React.Component {

  componentDidMount() {
    // this.props.fetchCategory(this.props.match.params.id);
  }

  renderActions() {
    const { id, itemId } = this.props.match.params;
    return (
      <>
        <button onClick={() => this.props.deleteCategory(id, itemId)} className='ui button negative'>Delete</button>
        <Link to='/' className='ui button'>Cancel</Link>
      </>
    );
  }

  renderContent() {
    if (!this.props.category) {
      return 'Are you sure you want to delete this Item?'
    }

    return `Are you sure you want to delete the Category: ${this.props.category.name}?`
  }

  render() {
    const { id } = this.props.match.params;
    return (
      <Modal
        title='Delete Category'
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push(`/items/${id}`)}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { category: state.categories[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchCategory, deleteCategory })(CategoryDelete);
