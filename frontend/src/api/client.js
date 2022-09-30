import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:8080/',
  headers: {
    'Content-Type': 'application/json',
  },
});

client.interceptors.request.use((config) => {
  const accessToken = 'Bearer ' + localStorage.getItem('accessToken');
  config.headers['access-token'] = accessToken;
  return config;
});

export default client;