import React from "react";
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import { Link as RouterLink } from 'react-router-dom';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";import ArrowBack from '@material-ui/icons/ArrowBack';
import { StyledTextField, StyledContainer, StyledTypography, StyledForm } from "./styles";
import { editLog } from '../../actions/logActions';

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
    const catId = this.props.selectedLog.category_id
    const itemId = this.props.match.params.itemId
    this.props.editLog(formValues, logId, catId, itemId);
  }

  render() {
    if (!this.props.selectedLog) {
      return <div>Loading...</div>
    }

    return (
      <StyledContainer>
        <StyledTypography variant="h2">
          Edit Log
        </StyledTypography>
        <StyledForm onSubmit={this.props.handleSubmit(this.onSubmit)} className='ui form error'>
          <Field
            name='date_performed'
            type='date'
            component={this.customDateField}
            variant='filled'
            label='Date Performed'
            fullWidth
          /><br />
          <Field
            name='date_due'
            type='date'
            component={this.customDateField}
            label='Date Due'
            variant='filled'
            fullWidth
          /><br />
          <Field
            name='cost'
            type='number'
            component={this.customTextField}
            variant='filled'
            label='Cost $'
            fullWidth
          /><br />
          <Field
            name='notes'
            type='text'
            component={this.customTextField}
            label='Notes'
            multiline={true}
            variant='filled'
            fullWidth
          /><br />
          <Field
            name='tools'
            type='text'
            component={this.customTextField}
            label='Tools Used'
            multiline={true}
            variant='filled'
            fullWidth
          /><br />
          <br/>
          <Box>
            <Button color='primary' type='submit'>Submit</Button>
          </Box>
          <br/>
        </StyledForm>
        <Box>
          <Fab
            color="secondary"
            aria-label="Back to Logs"
            size="small"
            to={`/item/${this.props.match.params.id}/category/${this.props.selectedLog.category_id}`}
            component={RouterLink}
          >
            <Tooltip title="Back to Logs">
              <ArrowBack />
            </Tooltip>
          </Fab>
        </Box>
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

const mapStateToProps = (state, ownProps) => {
  return {
    selectedLog: state.selectedLog[0],
    initialValues: state.selectedLog[0]
  };
}

LogEdit = reduxForm({
  form: 'logForm',
  validate: validate,
  // enableReinitialize: true
})(LogEdit)

export default connect(mapStateToProps, { editLog })(LogEdit);
