import axios from 'axios';

const host =
  process.env.NODE_ENV === 'development'
    ? '/'
    : process.env.REACT_APP_API_HOST || '/';
// const host = process.env.REACT_APP_API_HOST;

const apiClient = axios.create({
  baseURL: host,
  headers: {
    Cookie:
      'access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWE2YjU2YTY3M2RiMTAwMTcwYTExNjMiLCJ1c2VybmFtZSI6InVzZXIxIiwiaWF0IjoxNTkwMzg1NjEyLCJleHAiOjE1OTA5OTA0MTJ9.UnvtwF_-E1rdpzeRnp_dsUch0sjB9Hcsn0Dph5u63Lk',
  },
});

export default apiClient;

// REACT_APP_API_HOST=https://klaytn-makers-server.herokuapp.com/
// REACT_APP_PAGE_ADDRESS=https://klaytnmakers.netlify.app/

// const apiClient = axios.create();
// headers: {
//   Authorization: `Bearer ${localStorage.getItem("token")}`,
// },
