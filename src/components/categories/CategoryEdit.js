import React from "react";
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import { Link as RouterLink } from 'react-router-dom';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
import ArrowBack from '@material-ui/icons/ArrowBack';

import { editCategory } from '../../actions/categoryActions';

class CategoryEdit extends React.Component {

  renderError({ error, touched }) {
    if (touched && error) {
      return <div className='header'>{error}</div>;
    }
  }

  renderInput = ({ input, label, meta: { touched, error } }) => (
    <TextField
      label={label}
      autoComplete="off"
      {...input}
      margin="normal"
      error={touched && error}
      helperText={touched && error ? error : null}
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
            name='name'
            component={this.renderInput}
            label='Edit Category Name '
          /><br/>
          <br/>
          <Box>
            <Button color='primary' type='submit'>Submit</Button>
          </Box>
          <br/>
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

const validate = values => {
  const errors = {};
  const requiredFields = [
    'name',
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })
  return errors
}

const mapStateToProps = state => ({
  initialValues: state.selectedCategory[0]
})

CategoryEdit = reduxForm({
  form: 'categoryForm',
  validate: validate,
  // enableReinitialize: true
})(CategoryEdit);

export default connect(mapStateToProps, { editCategory })(CategoryEdit)