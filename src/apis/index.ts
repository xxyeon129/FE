import { SERVER_URL } from './../constants/constants';
import axios, { AxiosRequestConfig } from 'axios';

const baseInstance = axios.create({ baseURL: SERVER_URL });

baseInstance.interceptors.response.use(
  res => res,
  error => {
    console.log(`baseInstance.interceptors.response error: ${error}`);
    return Promise.reject(error);
  }
);

const apiRequest = {
  get: (url: string) => baseInstance.get(url),
  post: <T>(url: string, data: T, config?: AxiosRequestConfig) =>
    baseInstance.post(url, data, config),
};

export default apiRequest;
