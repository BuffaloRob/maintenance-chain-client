import React from "react";

import Log from '../logs/Log';

const LogList = ({ category, selectLog, match }) => {
  const renderList = category.logs.map(log => (
    <Log
      key={log.id}
      log={log}
      selectLog={selectLog}
      match={match}
      itemId={category.item.id}
      categoryId={category.id}
    />
  ));

  return (
    <div>
      <h2>Logs for {category.name}</h2>
      <div className='ui celled list'>{renderList}</div>
    </div>
  )
}

export default LogList;
