
import history from '../history';
import { SET_USER, LOGOUT } from './types';

const jwtDecode = require('jwt-decode');

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
        console.log(decoded);

        dispatch({
          type: SET_USER,
          payload: decoded
        })

        callback();
      })
      .catch(err => err)
  }
}

// export const login = (user, callback) => {
//   let data = {
//     method: 'POST',
//     credentials: 'include',
//     body: JSON.stringify(user)
//   }

//   return dispatch => {
//     fetch(`${API_URL}/login`, data)
//       .then(resp => resp.json())
//       .then(user => {
//         dispatch({
//           type: SET_USER,
//           payload: user.currentUser
//         })
        
//         callback()
//       })
//       .catch(err => err)
//   } 
// }

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

        let decoded = jwtDecode(user.jwt);
        console.log(decoded);

        dispatch({
          type: SET_USER,
          payload: decoded
        })

        callback()
      })
      .catch(err => err)
  }
}

// export const getUser = (credentials) => {
//   const request = new Request(`${API_URL}/find_user`, {
//     method: "POST",
//     headers: new Headers({
//       "Content-Type": "application/json",
//       "Authorization": `Bearer ${localStorage.token}`,
//     }),
//     body: JSON.stringify({ user: credentials })
//   })
//   return fetch(request)
//     .then(resp => resp.json())
//     .then(jresp => { return jresp })
//     .catch(error => {
//       return error;
//     });
// }

export const fetchUser = () => {
  let data = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.jwt
    }
  }

  return dispatch => {
    fetch(`${API_URL}/user`, data)
      .then(resp => resp.json())
      .then(user => {
        // debugger
        dispatch({
          type: SET_USER,
          payload: user
        })
      })
      .catch(err => err)
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
    return dispatch({ type: LOGOUT });
    
  }
}
