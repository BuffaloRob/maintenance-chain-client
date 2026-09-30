import React from "react";
import { useForm, Controller } from 'react-hook-form';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import Tooltip from "@mui/material/Tooltip";
import ArrowBack from '@mui/icons-material/ArrowBack';
import { StyledTextField, StyledContainer, BottomNav, StyledForm, StyledTitle, FormSubmit } from "./styles";
import { useGetItemsQuery, useUpdateLogMutation } from '../../store/api/maintenanceApi';

// Previously the redux-form validate(): every required field -> 'Required'
const rules = {
  date_performed: { required: 'Required' },
  date_due: { required: 'Required' },
};

// Mounted only once the cached log is available, so the log record is the
// form's defaults (redux-form initialValues semantics, no reinitialize). All
// of its fields are submitted, as before; the mutation strips id/itemId/categoryId.
const LogEditForm = ({ log, itemId, logId }) => {
  const navigate = useNavigate();
  const [updateLog] = useUpdateLogMutation();
  const { control, handleSubmit } = useForm({ mode: 'onTouched', defaultValues: log });
  const catId = log.category_id;

  const onSubmit = formValues =>
    updateLog({ ...formValues, id: logId, categoryId: catId, itemId }).unwrap()
      .then(() => navigate(`/item/${itemId}/category/${catId}`))
      .catch(() => {});

  // Date fields show their validation error; the other fields have no rules.
  const renderField = (name, props) => (
    <Controller
      name={name}
      control={control}
      rules={rules[name]}
      render={({ field: { ref, value, ...field }, fieldState: { error } }) => {
        // API nulls would make the input uncontrolled
        const common = { ...field, value: value ?? '', inputRef: ref };
        return props.type === 'date' ? (
          <StyledTextField
            slotProps={{ inputLabel: { shrink: true } }}
            error={!!error}
            helperText={error ? error.message : null}
            {...common}
            {...props}
          />
        ) : (
          <StyledTextField {...common} {...props} />
        );
      }}
    />
  );

  return (
    <StyledContainer>
      <StyledTitle variant="h2">
        Edit Log
      </StyledTitle>
      <StyledForm onSubmit={handleSubmit(onSubmit)} className='ui form error'>
        {renderField('date_performed', { type: 'date', margin: 'normal', label: 'Date Performed', fullWidth: true })}<br />
        {renderField('date_due', { type: 'date', label: 'Date Due', margin: 'normal', fullWidth: true })}<br />
        {renderField('cost', { type: 'number', margin: 'normal', label: 'Cost $', fullWidth: true })}<br />
        {renderField('notes', { type: 'text', label: 'Notes', multiline: true, margin: 'normal', fullWidth: true })}<br />
        {renderField('tools', { type: 'text', label: 'Tools Used', multiline: true, margin: 'normal', fullWidth: true })}<br />
        <br/>
        <FormSubmit>
          <Button
            color='primary'
            variant='outlined'
            type='submit'
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

const LogEdit = () => {
  const { itemId, id } = useParams();
  const { log } = useGetItemsQuery(undefined, {
    selectFromResult: ({ data }) => {
      const item = data && data.find(i => String(i.id) === String(itemId));
      return { log: item && item.logs.find(l => String(l.id) === String(id)) };
    },
  });

  if (!log) {
    return <div>Loading...</div>
  }
  return <LogEditForm log={log} itemId={itemId} logId={id} />;
};

export default LogEdit;
