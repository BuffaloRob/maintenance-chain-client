import history from '../history';
import * as types from './types';

export const fetchPastDue = () => {
  return dispatch => {
    fetch(`${process.env.REACT_APP_API_URL}/past_due`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.jwt
      }
    })
      .then(resp => resp.json())
      .then(resp => {
        if (!resp.error) {
          dispatch({
            type: types.FETCH_PAST_DUE,
            payload: resp
          })
          history.push(`/pastdue`)
        }
      })
      .catch(err => err)
  }
}