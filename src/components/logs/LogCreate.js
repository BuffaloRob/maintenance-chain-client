import React from "react";
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import { Link as RouterLink } from 'react-router-dom';
import { TextField, Button, Box, InputAdornment, Fab, Tooltip } from "@material-ui/core";
import ArrowBack from '@material-ui/icons/ArrowBack';

import { MuiPickersUtilsProvider, DatePicker, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import {KeyboardDateChooser} from './DatePicker'

import LogForm from './LogForm';
import { createLog } from '../../actions/logActions';

class LogCreate extends React.Component {

  state = { date: null };

  handleDateChange = (event, date) => {
    console.log(event, date)
    this.setState({date:event});
  };

  renderError({ error, touched }) {
    if (touched && error) {
      return <div className='header'>{error}</div>;
    }
  }

  renderInput = ({ input, label, meta, type, variant, inputProps, inputLabelProps, rows, multiline }) => (
    <TextField
      label={label}
      autoComplete="off"
      type={type}
      variant={variant}
      // inputProps={{inputProps}}
      // inputLabelProps={{inputLabelProps}}
      multiline={multiline}
      rows={rows}
      {...input}
      margin="normal"
    />
  )

  renderDate = ({ label, input, ...rest }) => (
    <DatePicker
      {...input}
      {...rest}
      value={this.state.date}
      onChange={this.handleDateChange}
      label={label}
      margin="normal"
      // {...input}
      // {...rest}
    />   
  )

  onSubmit = (formValues) => {
    const itemId = this.props.match.params.itemId;
    const catId = this.props.match.params.id;
    this.props.createLog(formValues, itemId, catId);
  }

  render() {
    return (
      <Box textAlign="center">
        <form onSubmit={this.props.handleSubmit(this.onSubmit)} className='ui form error'>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Field
              name='date_performed'
              component={this.renderDate}
              label='Date Performed'
            /><br />
            <Field
              name='date_due'
              component={this.renderDate}
              label='Date Due'
            // value={selectedDate}
            // onChange={onChange}
            /><br />
          </MuiPickersUtilsProvider>
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
            multiline={true}
            // rows='3'
          /><br />
          <Field
            name='log[tools]'
            type='text'
            component={this.renderInput}
            label='Tools Used'
            multiline={true}
            // rows='3'
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

const mapStateToProps = state => {
  return { 
    initialValues: { date: new Date() },
    // date: 
  }
}

LogCreate = reduxForm({
  form: 'logForm',
  validate: validate
})(LogCreate);


export default connect(mapStateToProps, { createLog })(LogCreate);
