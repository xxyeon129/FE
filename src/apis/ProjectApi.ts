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
    console.log(response.data);
    return response.data;
  } catch (error: unknown) {
    return error;
  }
};

export const getProject = async projectId => {
  const response = await axios.get(`${SERVER_URL}/api/projects/${projectId}`);
  return response.data.data;
};

export const updateProject = async (formData: FormData, projectId) => {
  await axios.patch(`${SERVER_URL}/api/projects/${projectId}`, formData, {
    headers: {
      Authorization: accessToken,
    },
  });
};
