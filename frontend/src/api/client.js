import axios from 'axios';

const client = axios.create({
  baseURL: 'https://j7e106.p.ssafy.io:8081/api',
  // baseURL: 'http://127.0.0.1:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

client.interceptors.request.use((config) => {
  config.headers['access-token'] = localStorage.getItem('accessToken');
  return config;
});

export default client;
