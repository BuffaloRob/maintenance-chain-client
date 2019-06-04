import { SELECT_ITEM, UPDATE_SELECTED_ITEM_ON_CAT_EDIT } from '../actions/types';

import _ from 'lodash'

export default (state = {}, action) => {
  switch (action.type) {
    case SELECT_ITEM:
      return Object.assign({}, state, action.payload)
    case UPDATE_SELECTED_ITEM_ON_CAT_EDIT:
      return {
        ...state,
        categories: [
          ...state.categories.map((cat) => {
            if(cat.id === action.payload.id) {
              return {
                ...cat,
                name: action.payload.name
              }
            }
            return cat
          })
        ]
      }
    default:
      return state
  }
}

// I need to dispatch an action in this reducer that will update the state using data that is formatted differently than what is coming back in the payload
// State structure => an object
// selectedItem:
//   {
//     id: 3
//     name: "test Item"
//     user: {user obj}
//     logs: []
//     categories[{}] //an array of objects, the numbers 0 & 1 refer to the array index
//       0: {id: 5, name: "cat5's name"}
//       1: {id: 6, name: "another Cat"}
//    }


// payload structure => an object
// {
//   id: 5
//   name: "cat5's name"
//   item: {id: 3, name:"test Item"}
//   logs: []
// }
