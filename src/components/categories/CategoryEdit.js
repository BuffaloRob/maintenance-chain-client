import React from "react";
import { Field, reduxForm } from 'redux-form'
import { Link as RouterLink } from 'react-router-dom';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import Tooltip from "@mui/material/Tooltip";
import ArrowBack from '@mui/icons-material/ArrowBack';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

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
      <StyledGridContainer container sx={{ justifyContent: 'center' }}>
        <Typography variant='h3' align='center'>Edit the category name</Typography>
        <Grid container sx={{
          justifyContent: 'center'
        }}>
          <form onSubmit={this.props.handleSubmit(this.props.onSubmit)} className='ui form error'>
            <Field
              name='name'
              component={this.renderInput}
              label='Edit Category Name '
            /><br />
            <br />
            <Grid container sx={{
              justifyContent: 'center'
            }}>
              <Button color='primary'variant='outlined' type='submit'>Submit</Button>
            </Grid>
            <br />
            <FabContainer container sx={{ justifyContent: 'center' }}>
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
    );
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
