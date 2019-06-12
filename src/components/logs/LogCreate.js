import React from "react";
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import { Link as RouterLink } from 'react-router-dom';
import { TextField, Button, Box, InputAdornment, Fab, Tooltip } from "@material-ui/core";
import ArrowBack from '@material-ui/icons/ArrowBack';

import { createLog } from '../../actions/logActions';

class LogCreate extends React.Component {

  textFieldWithAdornment = ({ InputProps = {}, input, ...restProps }) => {
    return (
      <TextField
        InputProps={{
          ...InputProps, startAdornment: (
            < InputAdornment >
              $
            </InputAdornment>
          ) }}
        {...input}
        {...restProps}
      />
    )
  }

  customTextField =({ input, ...restProps }) => {
    return (
      <TextField
        {...input}
        {...restProps}
      />
    )
  }

  customDateField = ({ InputLabelProps = {}, meta: { touched, error }, input, ...restProps }) => {
    return (
      <TextField
        InputLabelProps={{ ...InputLabelProps, shrink: true }}
        error={touched && error}
        helperText={ touched && error ? error : null}
        {...input}
        {...restProps}
      />
    )
  }

  onSubmit = (formValues) => {
    const itemId = this.props.match.params.itemId;
    const catId = this.props.match.params.id;
    this.props.createLog(formValues, itemId, catId);
  }

  render() {
    return (
      <Box textAlign="center">
        <form onSubmit={this.props.handleSubmit(this.onSubmit)} className='ui form error'>
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
          <Box>
            <Button color="primary" type='submit'>Submit</Button>
          </Box>
          <br/>
          <Box>
            <Fab
              color="secondary"
              aria-label="Back to Logs"
              size="small"
              to={`/item/${this.props.match.params.itemId}/category/${this.props.match.params.id}`}
              component={RouterLink}
            >
              <Tooltip title="Back to Logs">
                <ArrowBack />
              </Tooltip>
            </Fab>
          </Box>
        </form>
      </Box>
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

export default connect(null, { createLog })(LogCreate);
