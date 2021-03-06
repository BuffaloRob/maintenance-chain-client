import axios from 'axios';

// Set-up for the json-api server
export default axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  // baseURL: 'https://maintenance-chain-api.herokuapp.com/api/v1',
  // withCredentials: true,
  headers: { 
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.jwt
  }
})
