import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';
import {getToken} from './token';
import {store} from '../store';
import {setToDefault} from '../store/user-data/user-data';
import {TokenTypes} from '../const';

const BACKEND_URL = 'http://localhost:3000/';
const REQUEST_TIMEOUT = 5000;

export const createAPI = () => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config: AxiosRequestConfig) => {
    const token = getToken(TokenTypes.Token);

    if (token) {
      config.headers['Authorization'] = `Bearer: ${token}`;
    }

    return config;
  });

  api.interceptors.response.use(
    (response: AxiosResponse) => response,

    (error: AxiosError) => {
      const { response } = error;

      if (response?.status === 401) {
        store.dispatch(setToDefault());
      }

      return Promise.reject(error);
    }
  );

  return api;
};
