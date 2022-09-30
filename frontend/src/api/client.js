import axios from 'axios';

const client = axios.create({
  baseURL: 'https://j7e106.p.ssafy.io:8081',
  //baseURL: 'http://127.0.0.1:8080',
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
