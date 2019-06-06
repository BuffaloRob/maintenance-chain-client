
import history from '../history';
import { SET_USER, LOGOUT, CLEAR_DATA, AUTHENTICATION_FAILURE, AUTHENTICATION_SUCCESS } from './types';
import jwtDecode from 'jwt-decode';

const API_URL = "http://localhost:3000/api/v1"

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
    fetch(`${API_URL}/signup`, data)
      .then(resp => resp.json())
      .then(user => {
        sessionStorage.setItem('jwt', user.jwt);
        let decoded = jwtDecode(user.jwt);
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
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ user })
  }

  return dispatch => {
    fetch(`${API_URL}/login`, data)
      .then(resp => resp.json())
      .then(user => {
        sessionStorage.setItem('jwt', user.jwt)
        dispatch({
          type: AUTHENTICATION_SUCCESS,
          payload: user.user
        })
        callback()
      })
      .catch(err => {
        dispatch({
          type: AUTHENTICATION_FAILURE,
          payload: err
        })
      })
  }
}


export const fetchUser = () => {
  let data = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.jwt
      // 'Authorization': sessionStorage.jwt
    }
  }

  return dispatch => {
    fetch(`${API_URL}/user`, data)
      .then(resp => resp.json())
      .then(user => {
        if (user.error) {
          dispatch({
            type: AUTHENTICATION_FAILURE,
            payload: user.error
          })        
        } else {
          dispatch({
            type: AUTHENTICATION_SUCCESS,
            payload: user
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
    sessionStorage.clear();
    fetch(`${API_URL}/logout`, data)
    history.push('/');
    return dispatch({ type: CLEAR_DATA });
  }

}
