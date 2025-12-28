import axios from 'axios';
import { BASE_URL } from './const';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('six-cities-token');
  if (token && config.headers) {
    config.headers['X-Token'] = token;
  }
  return config;
});

export default api;
