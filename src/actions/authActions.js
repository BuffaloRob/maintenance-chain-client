import history from '../history';
import * as types from './types';

const API_URL = "http://localhost:3000/api"

// Using fetch to satisfy project requirements
export const signup = (user) => {
  const newUser = user
  return dispatch => {
    return fetch(`${API_URL}/users`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ user: user })
    })
      .then(resp => resp.json())
      .then(jresp => {
        dispatch(authenticate({
          email: newUser.email,
          password: newUser.password
        })
        );
      })
      .catch((errors) => {
        dispatch(authFailure(errors))
      })
  };
}

// Using fetch to satisfy project requirements
export const authenticate = (credentials) => {
  return dispatch => {
    dispatch(authRequest())
    return fetch(`${API_URL}/user_token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ auth: credentials })
    })
      .then(resp => resp.json())
      .then(jresp => {
        const token = jresp.jwt;
        localStorage.setItem('token', token);
        return getUser(credentials)
      })
      .then((user) => {
        dispatch(authSuccess(user, localStorage.token));
        history.push('/');
      })
      .catch((errors) => {
        dispatch(authFailure(errors))
        localStorage.clear()
      })
  }
}

export const getUser = (credentials) => {
  const request = new Request(`${API_URL}/find_user`, {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.token}`,
    }),
    body: JSON.stringify({ user: credentials })
  })
  return fetch(request)
    .then(resp => resp.json())
    .then(jresp => { return jresp })
    .catch(error => {
      return error;
    });
}

export const logout = () => {
  return dispatch => {
    localStorage.clear();
    history.push('/');
    return dispatch({ type: types.LOGOUT });
    
  }
}

export const authRequest = () => {
  return { type: types.AUTHENTICATION_REQUEST }
}

export const authSuccess = (user, token) => {
  return {
    type: types.AUTHENTICATION_SUCCESS,
    user: user,
    token: token
  }
}

export const authFailure = errors => {
  return {
    type: types.AUTHENTICATION_FAILURE,
    errors: errors
  }
}
