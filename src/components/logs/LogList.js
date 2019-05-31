import React from "react";
import { Link } from 'react-router-dom';

import Log from '../logs/Log';

const LogList = ({ category, selectLog, match, item }) => {

  const logs = item.logs.filter(log => (log.id === category[0].id))
  const renderList = logs.map(log => (
    <Log
      key={log.id}
      log={log}
      selectLog={selectLog}
      match={match}
      categoryId={category.id}
    />
  ));

  return (
    <div>
      {/* <h2>Logs for cat</h2> */}
      <h2>Logs for {category[0].name}</h2>
      <div className='ui celled list'>{renderList}</div>
      <div style={{ textAlign: 'right' }} >
        <Link to={`/item/${item.id}/category/${category[0].id}/log/new`} className='ui button primary'>Create New Log</Link>
      </div>
 
    </div>
  )
}

export default LogList;
