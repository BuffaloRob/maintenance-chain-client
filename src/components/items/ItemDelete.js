import React from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchItem, deleteItem } from '../../actions/itemActions';
import Modal from '../Modal';
import history from '../../history';


class ItemDelete extends React.Component {

  componentDidMount() {
    this.props.fetchItem(this.props.match.params.id);
  }

  renderActions() {
    const { id } = this.props.match.params;
    return(
      <>
        <button
          onClick={() => this.props.deleteItem(id)}
          className='ui button negative'
        >
          Delete
        </button>
        <Link to='/' className='ui button'>Cancel</Link>
      </>
    );
  }

  renderContent() {
    if(!this.props.item) {
      return 'Are you sure you want to delete this Item?'
    }

    return `Are you sure you want to delete the Item: ${this.props.item.name}?`
  }

  render() {
    return (
      <Modal 
        title='Delete Item'
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push('/')}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { item: state.items[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchItem, deleteItem })(ItemDelete);
