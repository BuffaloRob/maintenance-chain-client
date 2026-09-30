import React from "react";
import { Field, reduxForm } from 'redux-form'
import { Link as RouterLink } from 'react-router-dom';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
import ArrowBack from '@material-ui/icons/ArrowBack';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import history from '../../history';
import { useGetItemsQuery, useUpdateCategoryMutation } from '../../store/api/maintenanceApi';
import { FabContainer, StyledGridContainer } from "./styles";

class CategoryForm extends React.Component {

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

  render() {
    return (
      <StyledGridContainer container justify='center'>
        <Typography variant='h3' align='center'>Edit the category name</Typography>
        <Grid container justify='center'>
          <form onSubmit={this.props.handleSubmit(this.props.onSubmit)} className='ui form error'>
            <Field
              name='name'
              component={this.renderInput}
              label='Edit Category Name '
            /><br />
            <br />
            <Grid container justify='center'>
              <Button color='primary'variant='outlined' type='submit'>Submit</Button>
            </Grid>
            <br />
            <FabContainer container justify='center'>
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
            </FabContainer>
          </form>
        </Grid>

      </StyledGridContainer>
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

const CategoryFormRedux = reduxForm({
  form: 'categoryForm',
  validate: validate,
})(CategoryForm);

const CategoryEdit = ({ match }) => {
  const { itemId, id } = match.params;
  const { category } = useGetItemsQuery(undefined, {
    selectFromResult: ({ data }) => {
      const item = data && data.find(i => String(i.id) === String(itemId));
      return {
        category: item && item.categories.find(c => String(c.id) === String(id)),
      };
    },
  });
  const [updateCategory] = useUpdateCategoryMutation();

  const onSubmit = async formValues => {
    try {
      await updateCategory({ name: formValues.name, id, itemId }).unwrap();
      history.push(`/item/${itemId}`);
    } catch (err) {
      // stay on the form on failure
    }
  };

  if (!category) return null;
  return <CategoryFormRedux match={match} onSubmit={onSubmit} initialValues={category} />;
};

export default CategoryEdit;
