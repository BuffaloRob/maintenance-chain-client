import React from "react";
import { Link as RouterLink } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form'
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import ArrowBack from '@material-ui/icons/ArrowBack';
import Typography from "@material-ui/core/Typography";

import history from '../../history';
import { useCreateCategoryMutation } from '../../store/api/maintenanceApi';
import { StyledGridContainer, FabContainer } from './styles'

class CategoryForm extends React.Component {

  renderError({ error, touched }) {
    if (touched && error) {
      return <div className='header'>{error}</div>;
    }
  }

  renderInput = ({ input, label, meta: {touched, error} }) => (
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
        <Typography variant='h3' align='center'>Make a new maintenance category</Typography>
        <Grid container justify='center'>
          <form onSubmit={this.props.handleSubmit(this.props.onSubmit)} className='ui form error'>
            <Field
              name='name'
              component={this.renderInput}
              label='Enter Category Name '
            /><br />
            <br />
            <Grid container justify='center'>
              <Button color='primary' variant='outlined' type='submit'>Submit</Button>
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
  validate: validate
})(CategoryForm);

const CategoryCreate = ({ match }) => {
  const itemId = match.params.itemId;
  const [createCategory] = useCreateCategoryMutation();

  const onSubmit = async formValues => {
    try {
      await createCategory({ ...formValues, itemId }).unwrap();
      history.push(`/item/${itemId}`);
    } catch (err) {
      // stay on the form on failure
    }
  };

  return <CategoryFormRedux match={match} onSubmit={onSubmit} />;
};

export default CategoryCreate;
