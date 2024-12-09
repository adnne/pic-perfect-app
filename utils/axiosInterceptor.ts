/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const axiosInterceptor = axios.create({
  baseURL: 'http://bfb7-160-165-29-207.ngrok-free.app/api',
});

axiosInterceptor.interceptors.request.use(
   (config) => {
    const conf = config;
    const accessToken =  SecureStore.getItem('accessToken');
    if (accessToken) {
      if (config.headers) conf.headers.Authorization = `Bearer ${accessToken}`;
    }

    return conf;
  },
  (error) => {
    return Promise.reject(error);
  },
);


axiosInterceptor.interceptors.response.use(
  (response) => {
    return response;
  },
   async (error) => {
    console.log(error.response.data);
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      originalRequest.url === '/auth/token/refresh/'
    ) {
      return Promise.reject(error);
    }
    if (typeof SecureStore !== 'undefined') {
      const refreshToken = SecureStore.getItem('refreshToken');
      if (refreshToken) {
        const data = {
          refresh: refreshToken,
        };
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          return axiosInterceptor
            .post('/auth/token/refresh/', data)
            .then( (res) => {
              SecureStore.setItem('accessToken', res.data.access);
              const err = error;
              err.response.config.headers.Authorization = `Bearer ${res.data.access}`;

              return axiosInterceptor(err.response.config);
            })
            .catch( (err) => {
              console.log(err);
              
              if (err.response?.status === 401) {
                 SecureStore.deleteItemAsync('accessToken').then(() => {
                   console.log('access destroyed');
                 })
                 SecureStore.deleteItemAsync('refreshToken').then(() => {
                   console.log('refresh destroyed');
                 })
              }
              return Promise.reject(err);
            });
        }
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInterceptor;
