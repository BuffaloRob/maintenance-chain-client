import React from 'react';

const Log = ({ log, selectLog, match }) => {
  const itemId = match.params.id
  return (
    <div className='item' key={log.id} id={log.id} onClick={() => selectLog(log.id, itemId)} >
      <i className='large middle aligned icon wrench' />
      <h3 className='content' id={log.id}>{log.date_performed}</h3>
    </div>
  )
}

export default Log