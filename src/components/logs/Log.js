import React from 'react';
import moment from 'moment';


const Log = ({ log, selectLog, match }) => {
  const itemId = match.params.id
  const formattedDate = moment(log.date_performed).format("MMM Do YYYY");
  return (
    <div className='item' key={log.id} id={log.id} onClick={() => selectLog(log.id, itemId)} >
      <i className='large middle aligned icon wrench' />
      <h3 className='content' id={log.id}>{formattedDate}</h3>
    </div>
  )
}

export default Log