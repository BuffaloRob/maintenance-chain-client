import axios from 'axios';

// Set-up for the json-api server
export default axios.create({
  baseURL: 'http://localhost:3001'
})