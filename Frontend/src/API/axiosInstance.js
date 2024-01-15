import axios from 'axios';

//axios to creating BaseUrl
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: 'include',
  headers: { 'Access-Control-Allow-Origin': '*' }
});

export default axiosInstance;
