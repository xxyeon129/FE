import { SERVER_URL } from './../constants/constants';
import axios from 'axios';

const baseInstance = axios.create({ baseURL: SERVER_URL });

baseInstance.interceptors.response.use(
  ({ data }) => data,
  error => {
    console.log(`baseInstance.interceptors.response error: ${error}`);
    return Promise.reject(error);
  }
);

const apiRequest = {
  get: (url: string) => baseInstance.get(url),
};

export default apiRequest;
