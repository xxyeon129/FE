import axios from 'axios';
import { accessToken } from './token';
import { SERVER_URL } from '@src/constants/constants';

export const createProject = async (formData: FormData) => {
  try {
    const response = await axios.post(`${SERVER_URL}/api/projects`, formData, {
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
  const response = await axios.get(`${SERVER_URL}/api/projects/169`);
  return response.data.data;
};

export const updateProject = async (formData: FormData) => {
  await axios.patch(`${SERVER_URL}/api/projects/169`, formData, {
    headers: {
      Authorization: accessToken,
      Authorization: accessToken,
    },
  });
};
