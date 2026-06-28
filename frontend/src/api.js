import axios from 'axios';

const API = axios.create({
  baseURL: window.location.hostname === 'localhost' 
    ? 'http://localhost:3000' 
    : 'https://megamart-ftsk.onrender.com',
  withCredentials: true // This ensures cookies/sessions work globally
});

export default API;