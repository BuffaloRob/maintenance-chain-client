import React from "react";
import _ from 'lodash';
import { connect } from 'react-redux';

import { fetchItem, editItem } from '../../actions/itemActions';
import ItemForm from "./ItemForm";

class ItemEdit extends React.Component {

  onSubmit = formValues => {
    this.props.editItem(this.props.match.params.id, formValues);
  }

  render() {
    if (!this.props.item) {
      return <div>Loading...</div>
    }
    
    return (
      <div>
        <h3>Edit {this.props.item.name}</h3>
        <ItemForm 
          onSubmit={this.onSubmit}
          // initialValues={_.pick(this.props.item, 'name')}
        />
      </div>
    )
  }
   
}


const mapStateToProps = (state, ownProps) => {
  return { 
    item: state.items[ownProps.match.params.id]
  };
}

export default connect(mapStateToProps, { fetchItem, editItem })(ItemEdit);
