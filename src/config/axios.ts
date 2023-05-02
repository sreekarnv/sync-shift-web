import Axios from 'axios';

export const axios = Axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem('token')
      ? `Bearer ${localStorage.getItem('token')}`
      : undefined,
  },
});
