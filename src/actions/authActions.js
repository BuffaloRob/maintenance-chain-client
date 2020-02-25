
import history from '../history';
import { CLEAR_DATA, AUTHENTICATION_FAILURE, AUTHENTICATION_SUCCESS } from './types';
import jwtDecode from 'jwt-decode';

// REACT_APP_API_URL = "http://localhost:3000/api/v1"
// REACT_APP_API_URL = 'https://maintenance-chain-api.herokuapp.com/api/v1'

export const signup = (user, callback) => {
  let data = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ user })
  }
  return dispatch => {  
    fetch(`${process.env.REACT_APP_API_URL}/signup`, data)
      .then(resp => resp.json())
      .then(user => {
        localStorage.setItem('jwt', user.jwt);
        // sessionStorage.setItem('jwt', user.jwt);
        // let decoded = jwtDecode(user.jwt);
        dispatch({
          type: AUTHENTICATION_SUCCESS,
          payload: user.user
        })
        callback();
      })
      .catch(err => {
        dispatch({
          type: AUTHENTICATION_FAILURE,
          payload: err
        })
      })
  }
}

export const login = (user, callback) => {
  let data = {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      'Authorization': 'Bearer ' + localStorage.jwt
    },
    body: JSON.stringify({ user })
  }
  return dispatch => {
    fetch(`${process.env.REACT_APP_API_URL}/login`, data)
      .then(resp => resp.json())
      .then(user => {
        localStorage.setItem('jwt', user.jwt);
        if (user.message) {
          dispatch({
            type: AUTHENTICATION_FAILURE,
            payload: user.message
          })
        } else {
          dispatch({
            type: AUTHENTICATION_SUCCESS,
            payload: user.user
          })
          callback();
        }
      })
  }
}

// export const login = (user, callback) => {
//   let data = {
//     method: "POST",
//     headers: {
//       "Accept": "application/json",
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify({ user })
//   }
//   return dispatch => {
//     fetch(`${process.env.REACT_APP_API_URL}/login`, data)
//       .then(resp => resp.json())
//       .then(user => {
//         localStorage.setItem('jwt', user.jwt);
//         if (user.message) {
//           dispatch({
//             type: AUTHENTICATION_FAILURE,
//             payload: user.message
//           })
//         } else {
//           dispatch({
//             type: AUTHENTICATION_SUCCESS,
//             payload: user.user
//           })
//           callback();
//         }
//       })
//   }
// }

export const fetchUser = () => {
  let data = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.jwt
    }
  }
  return dispatch => {
    fetch(`${process.env.REACT_APP_API_URL}/user`, data)
      .then(resp => resp.json())
      .then(user => {
        // if (user.error) {
        if (user.message) {
          dispatch({
            type: AUTHENTICATION_FAILURE,
            payload: user.message
          })        
        } else {
          dispatch({
            type: AUTHENTICATION_SUCCESS,
            payload: user.user
          })
        }
      })
  }
}

export const logout = () => {
  let data = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      'Authorization': 'nil'
    }
  }
  return dispatch => {
    localStorage.clear();
    // sessionStorage.clear();
    fetch(`${process.env.REACT_APP_API_URL}/logout`, data)
    history.push('/');
    return dispatch({ type: CLEAR_DATA });
  }

}
