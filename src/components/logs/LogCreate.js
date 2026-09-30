import React from "react";
import { Field, reduxForm } from 'redux-form'
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Fab from "@mui/material/Fab";
import InputAdornment from "@mui/material/InputAdornment";
import ArrowBack from '@mui/icons-material/ArrowBack';

import { useCreateLogMutation } from '../../store/api/maintenanceApi';
import { StyledTextField, StyledContainer, FormSubmit, StyledForm, StyledTitle, BottomNav } from "./styles";

class LogCreate extends React.Component {

  textFieldWithAdornment = ({ input, ...restProps }) => {
    return (
      <StyledTextField
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                $
              </InputAdornment>
            ),
          },
        }}
        {...input}
        {...restProps}
      />
    )
  }

  customTextField =({ input, ...restProps }) => {
    return (
      <StyledTextField
        {...input}
        {...restProps}
      />
    )
  }

  customDateField = ({ meta: { touched, error }, input, ...restProps }) => {
    return (
      <StyledTextField
        slotProps={{ inputLabel: { shrink: true } }}
        error={touched && error}
        helperText={ touched && error ? error : null}
        {...input}
        {...restProps}
      />
    )
  }

  onSubmit = (formValues) => {
    const itemId = this.props.params.itemId;
    const catId = this.props.params.id;
    return this.props.createLog({ ...formValues, itemId, categoryId: catId }).unwrap()
      .then(() => this.props.navigate(`/item/${itemId}/category/${catId}`))
      .catch(() => {});
  }

  render() {
    return (
      <StyledContainer>
        <StyledTitle variant="h2">
          Create New Log
        </StyledTitle>
        <StyledForm onSubmit={this.props.handleSubmit(this.onSubmit)} className='ui form error'>
          <Field
            name='date_performed'
            type='date'
            component={this.customDateField}
            label='Date Performed'
            margin='normal'
            fullWidth
          /><br />
          <Field
            name='date_due'
            type='date'
            component={this.customDateField}
            label='Date Due'
            margin='normal'
            fullWidth
          /><br />
          <Field
            name='cost'
            type='number'
            component={this.customTextField}
            label='Cost $'
            margin='normal'
            fullWidth
          /><br />
          <Field
            name='notes'
            type='text'
            component={this.customTextField}
            label='Notes'
            multiline={true}
            margin='normal'
            fullWidth
          /><br />
          <Field
            name='tools'
            type='text'
            component={this.customTextField}
            label='Tools Used'
            multiline={true}
            margin='normal'
            fullWidth
          /><br />
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
            to={`/item/${this.props.params.itemId}/category/${this.props.params.id}`}
            component={RouterLink}
          >
            <Tooltip title="Back to Logs">
              <ArrowBack />
            </Tooltip>
          </Fab>
        </BottomNav>
      </StyledContainer>
    )
  }
}

const validate = values => {
  const errors = {};
  const requiredFields = [
    'date_performed',
    'date_due'
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })
  return errors
}

LogCreate = reduxForm({
  form: 'logForm',
  validate: validate
})(LogCreate);

const LogCreateContainer = (props) => {
  const params = useParams();
  const navigate = useNavigate();
  const [createLog] = useCreateLogMutation();
  return <LogCreate {...props} params={params} navigate={navigate} createLog={createLog} />;
};

export default LogCreateContainer;
