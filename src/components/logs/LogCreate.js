import React from "react";
import { useForm, Controller } from 'react-hook-form';
import { Link as RouterLink, useNavigate, useParams } from 'react-router';
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Fab from "@mui/material/Fab";
import ArrowBack from '@mui/icons-material/ArrowBack';

import FormError from '../common/FormError';
import { useCreateLogMutation } from '../../store/api/maintenanceApi';
import { errorMessage } from '../../store/api/errorMessage';
import { StyledTextField, StyledContainer, FormSubmit, StyledForm, StyledTitle, BottomNav } from "./styles";

// Previously the redux-form validate(): every required field -> 'Required'
const rules = {
  date_performed: { required: 'Required' },
  date_due: { required: 'Required' },
};

const defaultValues = { date_performed: '', date_due: '', cost: '', notes: '', tools: '' };

// redux-form dropped fields left empty (no initial value) from the submitted
// values; keep that so the POST body only contains filled-in fields.
const withoutEmpty = values =>
  Object.fromEntries(Object.entries(values).filter(([, v]) => v !== ''));

const LogCreate = () => {
  const { itemId, id: catId } = useParams();
  const navigate = useNavigate();
  const [createLog] = useCreateLogMutation();
  const { control, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm({ mode: 'onTouched', defaultValues });

  const onSubmit = async formValues => {
    try {
      await createLog({ ...withoutEmpty(formValues), itemId, categoryId: catId }).unwrap();
      navigate(`/item/${itemId}/category/${catId}`);
    } catch (err) {
      setError('root.serverError', { message: errorMessage(err) });
    }
  };

  // Date fields show their validation error; the other fields have no rules.
  const renderField = (name, props) => (
    <Controller
      name={name}
      control={control}
      rules={rules[name]}
      render={({ field: { ref, ...field }, fieldState: { error } }) => (
        props.type === 'date' ? (
          <StyledTextField
            slotProps={{ inputLabel: { shrink: true } }}
            error={!!error}
            helperText={error ? error.message : null}
            {...field}
            inputRef={ref}
            {...props}
          />
        ) : (
          <StyledTextField {...field} inputRef={ref} {...props} />
        )
      )}
    />
  );

  return (
    <StyledContainer>
      <StyledTitle variant="h2">
        Create New Log
      </StyledTitle>
      <StyledForm onSubmit={handleSubmit(onSubmit)} className='ui form error'>
        {renderField('date_performed', { type: 'date', label: 'Date Performed', margin: 'normal', fullWidth: true })}<br />
        {renderField('date_due', { type: 'date', label: 'Date Due', margin: 'normal', fullWidth: true })}<br />
        {renderField('cost', { type: 'number', label: 'Cost $', margin: 'normal', fullWidth: true })}<br />
        {renderField('notes', { type: 'text', label: 'Notes', multiline: true, margin: 'normal', fullWidth: true })}<br />
        {renderField('tools', { type: 'text', label: 'Tools Used', multiline: true, margin: 'normal', fullWidth: true })}<br />
        <FormError errors={errors} />
        <br/>
        <FormSubmit>
          <Button
            color='primary'
            variant='outlined'
            type='submit'
            disabled={isSubmitting}
          >
            Submit
          </Button>
        </FormSubmit>
        <br/>
      </StyledForm>
      <BottomNav>
        <Fab
          color="secondary"
          aria-label="Back to Logs"
          size="small"
          to={`/item/${itemId}/category/${catId}`}
          component={RouterLink}
        >
          <Tooltip title="Back to Logs">
            <ArrowBack />
          </Tooltip>
        </Fab>
      </BottomNav>
    </StyledContainer>
  );
};

export default LogCreate;
