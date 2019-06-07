import React from "react";
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import { Link as RouterLink } from 'react-router-dom';
import { TextField, Button, Box, InputAdornment, Fab, Tooltip } from "@material-ui/core";
import ArrowBack from '@material-ui/icons/ArrowBack';

import { createLog } from '../../actions/logActions';

class LogCreate extends React.Component {

  renderError({ error, touched }) {
    if (touched && error) {
      return <div className='header'>{error}</div>;
    }
  }

  // renderInput = ({ input, label, meta, type, variant, rows, multiline }) => (
  //   <TextField
  //     {...input}
  //     label={label}
  //     autoComplete="off"
  //     type={type}
  //     variant={variant}
  //     multiline={multiline}
  //     rows={rows}
  //     margin="normal"
  //   />
  // )

  textWithAdornment = ({ InputProps = {}, input, ...restProps }) => {
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

  customDateField = ({ InputLabelProps = {}, input, ...restProps }) => {
    return (
      <TextField
        InputLabelProps={{ ...InputLabelProps, shrink: true }}
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
            name='log[date_performed]'
            type='date'
            component={this.customDateField}
            label='Date Performed'
            margin='normal'
          /><br />
          <Field
            name='log[date_due]'
            type='date'
            component={this.customDateField}
            label='Date Due'
            margin='normal'
          /><br />
          <Field
            name='log[cost]'
            type='number'
            component={this.customTextField}
            label='Cost $'
            margin='normal'
          /><br />
          <Field
            name='log[notes]'
            type='text'
            component={this.customTextField}
            label='Notes'
            multiline={true}
            margin='normal'
          /><br />
          <Field
            name='log[tools]'
            type='text'
            component={this.customTextField}
            label='Tools Used'
            multiline={true}
            margin='normal'
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

const validate = formValues => {
  const errors = {};

  if (!formValues.name) {
    errors.name = "You Must Enter an Item Name"
  }

  return errors;
}

LogCreate = reduxForm({
  form: 'logForm',
  validate: validate
})(LogCreate);

export default connect(null, { createLog })(LogCreate);
