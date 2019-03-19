import axios from 'axios';

// Set-up for the json-api server
export default axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  headers: { 
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': sessionStorage.jwt
  }
})
