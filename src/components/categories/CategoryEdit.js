import React from "react";
import _ from 'lodash';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import { Link as RouterLink } from 'react-router-dom';
import { TextField, Button, Box, Fab, Tooltip } from "@material-ui/core";
import ArrowBack from '@material-ui/icons/ArrowBack';

import { editCategory } from '../../actions/categoryActions';

class CategoryEdit extends React.Component {

  renderError({ error, touched }) {
    if (touched && error) {
      return <div className='header'>{error}</div>;
    }
  }

  renderInput = ({ input, label, meta }) => (
    <TextField
      label={label}
      autoComplete="off"
      {...input}
      margin="normal"
    />
  )

  onSubmit = formValues => {
    const itemId = this.props.match.params.itemId
    const catId = this.props.match.params.id
    this.props.editCategory(formValues, catId , itemId);
  }

  render() {
    return (
      <Box textAlign="center">
        <form onSubmit={this.props.handleSubmit(this.onSubmit)} className='ui form error'>
          <Field
            name='category[name]'
            component={this.renderInput}
            label='Edit Category Name '
          />
          <Box>
            <Button color='primary' type='submit'>Submit</Button>
          </Box>
          <Box>
            <Fab
              color="secondary"
              aria-label="Back to Categories"
              size="small"
              to={`/item/${this.props.match.params.itemId}`}
              component={RouterLink}
            >
              <Tooltip title="Back to Categories">
                <ArrowBack />
              </Tooltip>
            </Fab>
          </Box>
        </form>
      </Box>
    )
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