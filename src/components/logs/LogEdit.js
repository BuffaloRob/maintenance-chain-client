import React from "react";
import { Field, reduxForm } from 'redux-form'
import { Link as RouterLink } from 'react-router-dom';
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
import ArrowBack from '@material-ui/icons/ArrowBack';
import { StyledTextField, StyledContainer, BottomNav, StyledForm, StyledTitle, FormSubmit } from "./styles";
import history from '../../history';
import { useGetItemsQuery, useUpdateLogMutation } from '../../store/api/maintenanceApi';

class LogEdit extends React.Component {

  customTextField = ({ input, ...restProps }) => {
    return (
      <StyledTextField
        {...input}
        {...restProps}
      />
    )
  }

  customDateField = ({ InputLabelProps = {}, meta: { touched, error }, input, ...restProps }) => {
    return (
      <StyledTextField
        InputLabelProps={{ ...InputLabelProps, shrink: true }}
        error={touched && error}
        helperText={touched && error ? error : null}
        {...input}
        {...restProps}
      />
    )
  }

  onSubmit = formValues => {
    const logId = this.props.match.params.id
    const catId = this.props.log.category_id
    const itemId = this.props.match.params.itemId
    return this.props.updateLog({ ...formValues, id: logId, categoryId: catId, itemId }).unwrap()
      .then(() => history.push(`/item/${itemId}/category/${catId}`))
      .catch(() => {});
  }

  render() {
    return (
      <StyledContainer>
        <StyledTitle variant="h2">
          Edit Log
        </StyledTitle>
        <StyledForm onSubmit={this.props.handleSubmit(this.onSubmit)} className='ui form error'>
          <Field
            name='date_performed'
            type='date'
            component={this.customDateField}
            margin='normal'
            label='Date Performed'
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
            margin='normal'
            label='Cost $'
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
            to={`/item/${this.props.match.params.itemId}/category/${this.props.log.category_id}`}
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

LogEdit = reduxForm({
  form: 'logForm',
  validate: validate,
  // enableReinitialize: true
})(LogEdit)

const LogEditContainer = (props) => {
  const { match } = props;
  const { log } = useGetItemsQuery(undefined, {
    selectFromResult: ({ data }) => {
      const item = data && data.find(i => String(i.id) === String(match.params.itemId));
      return { log: item && item.logs.find(l => String(l.id) === String(match.params.id)) };
    },
  });
  const [updateLog] = useUpdateLogMutation();

  if (!log) {
    return <div>Loading...</div>
  }
  return <LogEdit {...props} log={log} initialValues={log} updateLog={updateLog} />;
};

export default LogEditContainer;
