import React from "react";
import { Link as RouterLink } from 'react-router';
import { useForm, Controller } from 'react-hook-form';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Fab from "@mui/material/Fab";
import Tooltip from "@mui/material/Tooltip";
import FormHelperText from "@mui/material/FormHelperText";
import ArrowBack from '@mui/icons-material/ArrowBack';
import FormError from '../common/FormError';
import { errorMessage } from '../../store/api/errorMessage';
import { FabContainer } from './styles';

// Previously the redux-form validate(): every required field -> 'Required'
const rules = { name: { required: 'Required' } };

// onSubmit should throw (e.g. via unwrap()) when the save fails
const ItemForm = ({ onSubmit, initialValues }) => {
  // ItemEdit only mounts this once the cached item is available, so the
  // defaults are the record itself (redux-form initialValues semantics).
  const { control, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm({
    mode: 'onTouched',
    defaultValues: initialValues || { name: '' },
  });

  const submit = async formValues => {
    try {
      await onSubmit(formValues);
    } catch (err) {
      setError('root.serverError', { message: errorMessage(err) });
    }
  };

  const renderInput = (name, label) => (
    <Controller
      name={name}
      control={control}
      rules={rules[name]}
      render={({ field: { ref, ...field }, fieldState: { error } }) => (
        <>
          <TextField
            label={label}
            autoComplete="off"
            {...field}
            inputRef={ref}
            margin="normal"
            error={!!error}
            helperText={error ? error.message : null}
          />
          <FormHelperText error={!!error} />
        </>
      )}
    />
  );

  return (
    <Grid container sx={{
      justifyContent: 'center'
    }}>
      <form onSubmit={handleSubmit(submit)} className='ui form error'>
        {renderInput('name', 'Enter Item Name ')}<br/>
        <FormError errors={errors} />
        <br/>
        <Grid container sx={{
          justifyContent: 'center'
        }}>
          <Button
            color='primary'
            variant='outlined'
            type='submit'
            disabled={isSubmitting}
          >
            Submit
          </Button>
        </Grid>
        <br/>
        <FabContainer container sx={{ justifyContent: 'center' }}>
          <Fab
            color="secondary"
            aria-label="Back to Items"
            size="small"
            to={`/items`}
            component={RouterLink}
          >
            <Tooltip title="Back to Items">
              <ArrowBack />
            </Tooltip>
          </Fab>
        </FabContainer>
      </form>
    </Grid>
  );
};

export default ItemForm;
