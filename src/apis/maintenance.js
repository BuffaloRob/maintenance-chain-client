import axios from 'axios';

// Set-up for the json-api server
export default axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: { Authorization: `Bearer ${localStorage.token}` }
})

// TODO: set up connection to rails api