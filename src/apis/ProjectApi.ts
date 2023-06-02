import axios from 'axios';
import { accessToken } from './token';

const BASE_URL = 'http://3.34.102.60:8080/api';

export const createProject = async (formData: FormData) => {
  try {
    const response = await axios.post(`http://3.34.102.60:8080/api/projects`, formData, {
      headers: {
        Authorization: accessToken,
      },
    });
    return response.data;
  } catch (error: unknown) {
    return error;
  }
};

export const getProject = async () => {
  const response = await axios.get(`${BASE_URL}/projects/32`);
  return response.data.data;
};

export const updateProject = async (formData: FormData) => {
  await axios.patch(`${BASE_URL}/projects/32`, formData, {
    headers: {
      Authorization: accessToken,
    },
  });
};
