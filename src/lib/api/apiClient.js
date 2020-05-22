import axios from 'axios';

const host = process.env.REACT_APP_API_HOST;

const apiClient = axios.create({
  baseURL: host,
});

export default apiClient;

// REACT_APP_API_HOST=https://klaytn-makers-server.herokuapp.com/
// REACT_APP_PAGE_ADDRESS=https://klaytnmakers.netlify.app/

// const host =
//   process.env.NODE_ENV === 'development'
//     ? '/'
//     : process.env.REACT_APP_API_HOST || '/';
// const apiClient = axios.create();
