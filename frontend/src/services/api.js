import axios from "axios";
import { BASEURL } from "src/utils/constant";

export const apiClientAUth = axios.create({
  baseURL: 'https://student-portal-gfu6.onrender.com/api/v1'
});

const apiClient = axios.create({
  baseURL: 'https://student-portal-gfu6.onrender.com/api/v1'
});

apiClient.interceptors.request.use(async (config) => {
  config.headers["Access-Control-Allow-Origin"] = `*`;
  let token = getToken();
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
    config.headers["Content-Type"] = `application/json`;
  }
  return config;
});

apiClient.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    console.log('error', error);
    if (error.response.status === 401) {
      //toast.error(USER_DISABLE_SHOW_ERROR_MSG);
    }
    return Promise.reject(error);
  }
);

const getToken = () => {
  const user = JSON.parse(localStorage.getItem('user')) || null;
  return user?.token;
};


export default apiClient;
