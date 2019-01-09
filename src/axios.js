import axios from 'axios'

export default () => {
  let customAxios = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
      'Authorization': `${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json'
    }
  });

  customAxios.interceptors.response.use(function (response) {
    return response;
  }, function (error) {

    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      window.localStorage.removeItem('jwt');
      window.localStorage.removeItem('username');
      window.location.href = 'https://student-integration.pl';
    }

    return Promise.reject(error);
  });

  return customAxios;
}
