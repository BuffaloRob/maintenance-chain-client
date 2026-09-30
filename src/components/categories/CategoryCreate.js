import React from "react";
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Fab from "@mui/material/Fab";
import Grid from "@mui/material/Grid";
import ArrowBack from '@mui/icons-material/ArrowBack';
import Typography from "@mui/material/Typography";

import { useCreateCategoryMutation } from '../../store/api/maintenanceApi';
import { StyledGridContainer, FabContainer } from './styles'

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

const CategoryCreate = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const [createCategory] = useCreateCategoryMutation();
  const { control, handleSubmit } = useForm({
    mode: 'onTouched',
    defaultValues: { name: '' },
  });

  const onSubmit = async formValues => {
    try {
      await createCategory({ ...formValues, itemId }).unwrap();
      navigate(`/item/${itemId}`);
    } catch (err) {
      // stay on the form on failure
    }
  };

  return (
    <StyledGridContainer container sx={{ justifyContent: 'center' }}>
      <Typography variant='h3' align='center'>Make a new maintenance category</Typography>
      <Grid container sx={{
        justifyContent: 'center'
      }}>
        <form onSubmit={handleSubmit(onSubmit)} className='ui form error'>
          {renderInput(control, 'name', 'Enter Category Name ')}<br />
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

export default CategoryCreate;
