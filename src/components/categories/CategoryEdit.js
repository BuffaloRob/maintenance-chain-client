import React from "react";
import { Link as RouterLink, useNavigate, useParams } from 'react-router';
import { useForm, Controller } from 'react-hook-form';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import Tooltip from "@mui/material/Tooltip";
import ArrowBack from '@mui/icons-material/ArrowBack';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { useGetItemsQuery, useUpdateCategoryMutation } from '../../store/api/maintenanceApi';
import { FabContainer, StyledGridContainer } from "./styles";

// Previously the redux-form validate(): every required field -> 'Required'
const rules = { name: { required: 'Required' } };

const renderInput = (control, name, label) => (
  <Controller
    name={name}
    control={control}
    rules={rules[name]}
    render={({ field: { ref, ...field }, fieldState: { error } }) => (
      <TextField
        label={label}
        autoComplete="off"
        {...field}
        inputRef={ref}
        margin="normal"
        error={!!error}
        helperText={error ? error.message : null}
      />
    )}
  />
);

// Mounted only once the cached category is available, so its values are the
// form defaults (redux-form initialValues semantics, no reinitialize).
const CategoryEditForm = ({ itemId, category, onSubmit }) => {
  const { control, handleSubmit } = useForm({
    mode: 'onTouched',
    defaultValues: category,
  });

  return (
    <StyledGridContainer container sx={{ justifyContent: 'center' }}>
      <Typography variant='h3' align='center'>Edit the category name</Typography>
      <Grid container sx={{
        justifyContent: 'center'
      }}>
        <form onSubmit={handleSubmit(onSubmit)} className='ui form error'>
          {renderInput(control, 'name', 'Edit Category Name ')}<br />
          <br />
          <Grid container sx={{
            justifyContent: 'center'
          }}>
            <Button color='primary' variant='outlined' type='submit'>Submit</Button>
          </Grid>
          <br />
          <FabContainer container sx={{ justifyContent: 'center' }}>
            <Fab
              color="secondary"
              aria-label="Back to Categories"
              size="small"
              to={`/item/${itemId}`}
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
};

const CategoryEdit = () => {
  const { itemId, id } = useParams();
  const navigate = useNavigate();
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
      navigate(`/item/${itemId}`);
    } catch (err) {
      // stay on the form on failure
    }
  };

  if (!category) return null;
  return <CategoryEditForm itemId={itemId} onSubmit={onSubmit} category={category} />;
};

export default CategoryEdit;
