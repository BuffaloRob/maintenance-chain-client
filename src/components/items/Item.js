import React from 'react';

const Item = ({ item, selectItem }) => {
  // const triggerSelectItem = event => {
  //   event.preventDefault();
  //   selectItem(event.target.id)
  // }
  return (
    // <div className='item' key={item.id} id={item.id} onClick={triggerSelectItem}>
    <div className='item' key={item.id} id={item.id} onClick={() => selectItem(item.id)}>
    {/* <div className='item' key={item.id} id={item.id} > */}
      <i className="large middle aligned wrench icon" />
      <h3 className='content' id={item.id} >{item.name}</h3>
    </div>
  )
}

export default Item