import Axios from 'axios';

export const axios = Axios.create({
  baseURL: import.meta.env.VITE_APP_SERVER_URL || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem('token')
      ? `Bearer ${localStorage.getItem('token')}`
      : undefined,
  },
});
