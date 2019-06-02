import React from "react";
import _ from 'lodash';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import { TextField, Button, Box, InputAdornment } from "@material-ui/core";

import { editLog } from '../../actions/logActions';

class LogEdit extends React.Component {

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

  onSubmit = formValues => {
    const logId = this.props.match.params.id
    const catId = this.props.selectedLog.category_id
    const itemId = this.props.match.params.itemId
    this.props.editLog(formValues, logId, catId, itemId);
  }

  render() {
    if (!this.props.log) {
      return <div>Loading...</div>
    }

    return (
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
          <Button type='submit'>Submit</Button>
        </Box>
      </form>
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
    selectedLog: state.selectedLog[0]
  };
}

LogEdit = reduxForm({
  form: 'logForm',
  validate: validate
})(LogEdit)

export default connect(mapStateToProps, { editLog })(LogEdit);
