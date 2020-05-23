import axios from 'axios';

function getCookie(cookieName) {
  var cookieValue = null;
  if (document.cookie) {
    var array = document.cookie.split(escape(cookieName) + '=');
    if (array.length >= 2) {
      var arraySub = array[1].split(';');
      cookieValue = unescape(arraySub[0]);
    }
  }
  return cookieValue;
}

const host =
  process.env.NODE_ENV === 'development'
    ? '/'
    : process.env.REACT_APP_API_HOST || '/';
// const host = process.env.REACT_APP_API_HOST;

const apiClient = axios.create({
  baseURL: host,
  headers: {
    Cookie: `access_token ${getCookie('access_token')} `,
  },
});

export default apiClient;

// REACT_APP_API_HOST=https://klaytn-makers-server.herokuapp.com/
// REACT_APP_PAGE_ADDRESS=https://klaytnmakers.netlify.app/

// const apiClient = axios.create();
// headers: {
//   Authorization: `Bearer ${localStorage.getItem("token")}`,
// },
