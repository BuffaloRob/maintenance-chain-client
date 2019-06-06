import React from "react";
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import { Link as RouterLink } from 'react-router-dom';
import { TextField, Button, Box, InputAdornment, Fab, Tooltip } from "@material-ui/core";
import ArrowBack from '@material-ui/icons/ArrowBack';

import { editLog } from '../../actions/logActions';

class LogEdit extends React.Component {

  renderError({ error, touched }) {
    if (touched && error) {
      return <div className='header'>{error}</div>;
    }
  }

  renderInput = ({ input, label, meta, type, variant, rows }) => (
    <TextField
      label={label}
      autoComplete="off"
      type={type}
      variant={variant}
      rows={rows}
      {...input}
      margin="normal"
    />
  )

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
      <Box textAlign="center">
        <form onSubmit={this.props.handleSubmit(this.onSubmit)} className='ui form error'>
          <Field
            name='date_performed'
            type='date'
            component={this.renderInput}
            label='Date Performed'
            // variant='outlined'
            inputlabelprops={{
              shrink: true,
              variant: 'outlined',
            }}
          /><br />
          <Field
            name='date_due'
            type='date'
            component={this.renderInput}
            label='Date Due'
          /><br />
          <Field
            name='cost'
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
            name='notes'
            type='text'
            component={this.renderInput}
            label='Notes'
          /><br />
          <Field
            name='tools'
            type='text'
            component={this.renderInput}
            label='Tools Used'
          /><br />
          <Box>
            <Button color='primary' type='submit'>Submit</Button>
          </Box>
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
