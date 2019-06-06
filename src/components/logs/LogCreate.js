import React from "react";
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import { Link as RouterLink } from 'react-router-dom';
import { TextField, Button, Box, InputAdornment, Fab, Tooltip } from "@material-ui/core";
import ArrowBack from '@material-ui/icons/ArrowBack';

import LogForm from './LogForm';
import { createLog } from '../../actions/logActions';

class LogCreate extends React.Component {

  renderError({ error, touched }) {
    if (touched && error) {
      return <div className='header'>{error}</div>;
    }
  }

  renderInput = ({ input, label, meta, type, variant, inputProps, inputLabelProps, rows }) => (
    <TextField
      label={label}
      autoComplete="off"
      type={type}
      variant={variant}
      // inputProps={{inputProps}}
      // inputLabelProps={{inputLabelProps}}
      rows={rows}
      {...input}
      margin="normal"
    />
  )

  onSubmit = (formValues) => {
    const itemId = this.props.match.params.itemId;
    const catId = this.props.match.params.id;
    // const { log } = formValues;
    // const newValues = { ...log, ...{category_id: catId} };
    this.props.createLog(formValues, itemId, catId);
  }

  render() {
    return (
      <Box textAlign="center">
        <form onSubmit={this.props.handleSubmit(this.onSubmit)} className='ui form error'>
          <Field
            name='log[date_performed]'
            type='date'
            component={this.renderInput}
            label='Date Performed'
            variant='outlined'
            inputlabelprops={{
              shrink: true,
              variant: 'outlined',
            }}
          /><br />
          <Field
            name='log[date_due]'
            type='date'
            component={this.renderInput}
            label='Date Due'
          /><br />
          <Field
            name='log[cost]'
            type='number'
            component={this.renderInput}
            label='Cost $'
            inputProps={{
              startAdornment: (
                < InputAdornment position="start" >
                  $
              </InputAdornment>
              ),
            }}
          /><br />
          <Field
            name='log[notes]'
            type='text'
            component={this.renderInput}
            label='Notes'
          /><br />
          <Field
            name='log[tools]'
            type='text'
            component={this.renderInput}
            label='Tools Used'
          /><br />
          <Box>
            <Button color="primary" type='submit'>Submit</Button>
          </Box>
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
