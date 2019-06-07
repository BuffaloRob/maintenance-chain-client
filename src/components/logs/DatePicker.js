import React, { useState } from "react";
import { DatePicker } from "@material-ui/pickers";

export const KeyboardDateChooser = (props) => {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <>
      <DatePicker
        label={props.label}
        value={selectedDate}
        onChange={handleDateChange}
        margin='normal'
      />
    </>
  )
}
