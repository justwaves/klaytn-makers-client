import axios from 'axios';

const host =
  process.env.NODE_ENV === 'development'
    ? '/'
    : process.env.REACT_APP_API_HOST || '/';
// const host = process.env.REACT_APP_API_HOST;

const apiClient = axios.create({
  baseURL: host,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

export default apiClient;

// REACT_APP_API_HOST=https://klaytn-makers-server.herokuapp.com/
// REACT_APP_PAGE_ADDRESS=https://klaytnmakers.netlify.app/

// const apiClient = axios.create();
// headers: {
//   Authorization: `Bearer ${localStorage.getItem("token")}`,
// },
