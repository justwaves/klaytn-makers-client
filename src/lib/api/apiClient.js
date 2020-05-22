import axios from 'axios';

// const host = process.env.REACT_APP_API_HOST;
const host =
  process.env.NODE_ENV === 'development'
    ? '/'
    : process.env.REACT_APP_API_HOST || '/';
const apiClient = axios.create({
  baseURL: host,
  withCredentials: true,
});

// const apiClient = axios.create();

export default apiClient;
