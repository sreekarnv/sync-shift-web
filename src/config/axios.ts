import Axios from 'axios';

export const axios = Axios.create({
  baseURL: process.env.VITE_APP_SERVER_URL || 'http://localhost:8080',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});
