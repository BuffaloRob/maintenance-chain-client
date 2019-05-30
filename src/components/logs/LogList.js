import React from "react";

import Log from '../logs/Log';

const LogList = ({ category, selectLog, match, item }) => {
  debugger
  const filteredLogs = item.logs.filter(log => log.category_id == category.id)
  const renderList = filteredLogs.map(log => (
    <Log
      key={log.id}
      log={log}
      selectLog={selectLog}
      match={match}
      categoryId={category.id}
    />
  ));
  // const renderList = category.logs.map(log => (
  //   <Log
  //     key={log.id}
  //     log={log}
  //     selectLog={selectLog}
  //     match={match}
  //     categoryId={category.id}
  //   />
  // ));

  return (
    <div>
      <h2>Logs for cat</h2>
      {/* <h2>Logs for {item.categories[categoryId].name}</h2> */}
      <div className='ui celled list'>{renderList}</div>
    </div>
  )
}

export default LogList;
